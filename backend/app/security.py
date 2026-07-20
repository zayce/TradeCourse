from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError
from passlib.context import CryptContext

from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_minutes: int) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
    except JWTError:
        return None


def create_login_token(user_id: int) -> str:
    return create_access_token(
        {"sub": str(user_id), "type": "access"},
        settings.ACCESS_TOKEN_EXPIRE_MINUTES,
    )


def create_email_verification_token(user_id: int, email: str) -> str:
    return create_access_token(
        {"sub": str(user_id), "email": email, "type": "email_verify"},
        settings.EMAIL_TOKEN_EXPIRE_MINUTES,
    )