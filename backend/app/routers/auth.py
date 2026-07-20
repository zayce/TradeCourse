from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session

from .. import models, schemas, security
from ..database import get_db
from ..email_utils import send_verification_email

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=schemas.MessageResponse, status_code=status.HTTP_201_CREATED)
def register(payload: schemas.RegisterRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже зарегистрирован")

    user = models.User(
        name=payload.name,
        email=payload.email,
        hashed_password=security.hash_password(payload.password),
        is_verified=False,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = security.create_email_verification_token(user.id, user.email)
    background_tasks.add_task(send_verification_email, user.email, user.name, token)

    return {"message": "Регистрация прошла успешно. Проверьте почту, чтобы подтвердить email."}


@router.get("/verify-email", response_model=schemas.MessageResponse)
def verify_email(token: str, db: Session = Depends(get_db)):
    payload = security.decode_token(token)
    if not payload or payload.get("type") != "email_verify":
        raise HTTPException(status_code=400, detail="Недействительная или просроченная ссылка подтверждения")

    user = db.query(models.User).filter(models.User.id == int(payload["sub"])).first()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    if user.is_verified:
        return {"message": "Email уже был подтверждён ранее"}

    user.is_verified = True
    db.commit()

    return {"message": "Email успешно подтверждён! Теперь вы можете войти."}


@router.post("/resend-verification", response_model=schemas.MessageResponse)
def resend_verification(payload: schemas.ResendVerificationRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user:
        # не палим, существует ли пользователь
        return {"message": "Если такой email зарегистрирован, письмо отправлено повторно."}

    if user.is_verified:
        return {"message": "Этот email уже подтверждён."}

    token = security.create_email_verification_token(user.id, user.email)
    background_tasks.add_task(send_verification_email, user.email, user.name, token)

    return {"message": "Если такой email зарегистрирован, письмо отправлено повторно."}


@router.post("/login", response_model=schemas.TokenResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user or not security.verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")

    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Email не подтверждён. Проверьте почту.")

    access_token = security.create_login_token(user.id)
    return {"access_token": access_token, "user": user}