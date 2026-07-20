import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from .config import settings


def send_email(to_email: str, subject: str, html_body: str) -> None:
    """Отправляет письмо через SMTP. Если SMTP не настроен — печатает в консоль (удобно для разработки)."""

    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        print("=" * 60)
        print("[DEV MODE] SMTP не настроен — письмо не отправлено, вывожу в консоль:")
        print(f"Кому: {to_email}")
        print(f"Тема: {subject}")
        print(html_body)
        print("=" * 60)
        return

    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = settings.SMTP_FROM
    message["To"] = to_email
    message.attach(MIMEText(html_body, "html"))

    context = ssl.create_default_context()
    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls(context=context)
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_FROM, to_email, message.as_string())


def send_verification_email(to_email: str, name: str, token: str) -> None:
    verify_link = f"{settings.FRONTEND_URL}/verify-email?token={token}"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Привет, {name}!</h2>
        <p>Спасибо за регистрацию в QAZANC LAB. Подтверди свой email, нажав на кнопку ниже:</p>
        <p style="text-align: center; margin: 32px 0;">
            <a href="{verify_link}"
               style="background:#6c5ce7;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">
               Подтвердить email
            </a>
        </p>
        <p>Или перейди по ссылке:<br><a href="{verify_link}">{verify_link}</a></p>
        <p style="color:#888;font-size:12px;">Ссылка действительна 24 часа. Если это были не вы — просто проигнорируйте письмо.</p>
    </div>
    """
    send_email(to_email, "Подтвердите свой email — QAZANC LAB", html_body)