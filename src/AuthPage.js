import { useState } from "react";
import "./AuthPage.scss";
import { authApi } from "./api";

/* ---------- иконка-глаз для показа/скрытия пароля (div + css) ---------- */
function EyeIcon({ open }) {
  return (
    <div className={`eye-icon ${open ? "eye-icon--open" : ""}`}>
      <div className="eye-icon__shape" />
    </div>
  );
}

/* ---------- поле ввода с плавающим лейблом ---------- */
function FormField({
  label,
  type = "text",
  value,
  onChange,
  error,
  showToggle,
  visible,
  onToggleVisible,
  autoComplete,
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className={`field ${error ? "field--error" : ""}`}>
      <div className={`field__box ${focused ? "field__box--focused" : ""}`}>
        <input
          className="field__input"
          type={showToggle ? (visible ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={autoComplete}
        />
        <div className={`field__label ${active ? "field__label--up" : ""}`}>
          {label}
        </div>
        {showToggle && (
          <div className="field__toggle" onClick={onToggleVisible}>
            <EyeIcon open={visible} />
          </div>
        )}
        <div className="field__underline" />
      </div>
      {error && <div className="field__error">{error}</div>}
    </div>
  );
}

/* ---------- баннер для успеха/ошибки формы (инлайн-стили, чтобы работало без правок scss) ---------- */
function Banner({ type, children }) {
  if (!children) return null;
  const style = {
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "14px",
    background:
      type === "error" ? "rgba(255,90,90,0.12)" : "rgba(90,200,120,0.12)",
    color: type === "error" ? "#e35555" : "#2fa860",
    border: `1px solid ${type === "error" ? "rgba(255,90,90,0.3)" : "rgba(90,200,120,0.3)"}`,
  };
  return <div style={style}>{children}</div>;
}

export const AuthPage = () => {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [remember, setRemember] = useState(false);
  const [agree, setAgree] = useState(false);
  const [shake, setShake] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [banner, setBanner] = useState({ type: null, text: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setFieldErrors((errs) => ({ ...errs, [key]: null }));
  };

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    setBanner({ type: null, text: "" });
    setFieldErrors({});
  };

  const validate = () => {
    const errs = {};
    if (mode === "register" && form.name.trim().length === 0) {
      errs.name = "Введите имя";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Введите корректный email";
    }
    if (form.password.length < 6) {
      errs.password = "Минимум 6 символов";
    }
    if (mode === "register" && form.confirm !== form.password) {
      errs.confirm = "Пароли не совпадают";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBanner({ type: null, text: "" });

    if (mode === "register" && !agree) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!validate()) return;

    setSubmitting(true);
    try {
      if (mode === "register") {
        const res = await authApi.register({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setBanner({
          type: "success",
          text: res.message || "Проверьте почту, чтобы подтвердить email.",
        });
        setForm({ name: "", email: form.email, password: "", confirm: "" });
      } else {
        const res = await authApi.login({
          email: form.email,
          password: form.password,
        });
        // Сохраняем токен. remember решает, переживёт ли он закрытие вкладки.
        if (remember) {
          localStorage.setItem("access_token", res.access_token);
        } else {
          sessionStorage.setItem("access_token", res.access_token);
        }
        setBanner({
          type: "success",
          text: "Успешный вход! Перенаправляем...",
        });
        // здесь обычно редирект в приложение, например:
        // window.location.href = "/dashboard";
      }
    } catch (err) {
      setBanner({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__bg">
        <div className="auth__blob auth__blob--1" />
        <div className="auth__blob auth__blob--2" />
        <div className="auth__grid" />
      </div>

      <div className="auth__card">
        <div className="auth__brand">
          <div className="auth__brand-mark">
            <div className="auth__brand-arrow" />
          </div>
          <div className="auth__brand-name">
            QAZANC<div className="auth__brand-accent">LAB</div>
          </div>
        </div>

        <div className="auth__tabs">
          <div
            className={`auth__tab ${mode === "login" ? "auth__tab--active" : ""}`}
            onClick={() => switchMode("login")}
          >
            Вход
          </div>
          <div
            className={`auth__tab ${mode === "register" ? "auth__tab--active" : ""}`}
            onClick={() => switchMode("register")}
          >
            Регистрация
          </div>
          <div
            className={`auth__tab-indicator ${mode === "register" ? "auth__tab-indicator--right" : ""}`}
          />
        </div>

        <div className="auth__panels">
          {/* ---------------- LOGIN ---------------- */}
          <div
            className={`auth__panel ${mode === "login" ? "auth__panel--active auth__panel--from-left" : "auth__panel--hidden-left"}`}
          >
            <div className="auth__title">С возвращением</div>
            <div className="auth__subtitle">
              Войди в аккаунт, чтобы продолжить обучение
            </div>

            {mode === "login" && (
              <Banner type={banner.type}>{banner.text}</Banner>
            )}

            <form className="auth__form" onSubmit={handleSubmit}>
              <FormField
                label="Email"
                type="email"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
                error={mode === "login" ? fieldErrors.email : null}
              />
              <FormField
                label="Пароль"
                value={form.password}
                onChange={update("password")}
                showToggle
                visible={showPass}
                onToggleVisible={() => setShowPass((v) => !v)}
                autoComplete="current-password"
                error={mode === "login" ? fieldErrors.password : null}
              />

              <div className="auth__row">
                <div
                  className={`checkbox ${remember ? "checkbox--checked" : ""}`}
                  onClick={() => setRemember((v) => !v)}
                >
                  <div className="checkbox__box">
                    <div className="checkbox__mark" />
                  </div>
                  <div className="checkbox__label">Запомнить меня</div>
                </div>
                <div className="auth__link">Забыли пароль?</div>
              </div>

              <button
                type="submit"
                className="auth__submit"
                disabled={submitting}
              >
                <div className="auth__submit-label">
                  {submitting ? "Входим..." : "Войти"}
                </div>
                <div className="auth__submit-arrow">→</div>
              </button>
            </form>

            <div className="auth__switch">
              Нет аккаунта?{" "}
              <div
                className="auth__switch-link"
                onClick={() => switchMode("register")}
              >
                Зарегистрироваться
              </div>
            </div>
          </div>

          {/* ---------------- REGISTER ---------------- */}
          <div
            className={`auth__panel ${mode === "register" ? "auth__panel--active auth__panel--from-right" : "auth__panel--hidden-right"}`}
          >
            <div className="auth__title">Создать аккаунт</div>
            <div className="auth__subtitle">
              Начни строить свой доход уже сегодня
            </div>

            {mode === "register" && (
              <Banner type={banner.type}>{banner.text}</Banner>
            )}

            <form className="auth__form" onSubmit={handleSubmit}>
              <FormField
                label="Имя"
                value={form.name}
                onChange={update("name")}
                autoComplete="name"
                error={mode === "register" ? fieldErrors.name : null}
              />
              <FormField
                label="Email"
                type="email"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
                error={mode === "register" ? fieldErrors.email : null}
              />
              <FormField
                label="Пароль"
                value={form.password}
                onChange={update("password")}
                showToggle
                visible={showPass}
                onToggleVisible={() => setShowPass((v) => !v)}
                autoComplete="new-password"
                error={mode === "register" ? fieldErrors.password : null}
              />
              <FormField
                label="Повторите пароль"
                value={form.confirm}
                onChange={update("confirm")}
                showToggle
                visible={showPass2}
                onToggleVisible={() => setShowPass2((v) => !v)}
                autoComplete="new-password"
                error={mode === "register" ? fieldErrors.confirm : null}
              />

              <div
                className={`checkbox checkbox--terms ${agree ? "checkbox--checked" : ""} ${shake ? "checkbox--shake" : ""}`}
                onClick={() => setAgree((v) => !v)}
              >
                <div className="checkbox__box">
                  <div className="checkbox__mark" />
                </div>
                <div className="checkbox__label">
                  Я согласен с условиями использования
                </div>
              </div>

              <button
                type="submit"
                className="auth__submit"
                disabled={submitting}
              >
                <div className="auth__submit-label">
                  {submitting ? "Регистрируем..." : "Зарегистрироваться"}
                </div>
                <div className="auth__submit-arrow">→</div>
              </button>
            </form>

            <div className="auth__switch">
              Уже есть аккаунт?{" "}
              <div
                className="auth__switch-link"
                onClick={() => switchMode("login")}
              >
                Войти
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
