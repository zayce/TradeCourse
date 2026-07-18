import { useState } from "react";
import "./AuthPage.scss";

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

export const AuthPage = () =>  {
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

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "register" && !agree) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    // здесь будет реальная отправка формы
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

            <form className="auth__form" onSubmit={handleSubmit}>
              <FormField
                label="Email"
                type="email"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
              />
              <FormField
                label="Пароль"
                value={form.password}
                onChange={update("password")}
                showToggle
                visible={showPass}
                onToggleVisible={() => setShowPass((v) => !v)}
                autoComplete="current-password"
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

              <button type="submit" className="auth__submit">
                <div className="auth__submit-label">Войти</div>
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

            <form className="auth__form" onSubmit={handleSubmit}>
              <FormField
                label="Имя"
                value={form.name}
                onChange={update("name")}
                autoComplete="name"
              />
              <FormField
                label="Email"
                type="email"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
              />
              <FormField
                label="Пароль"
                value={form.password}
                onChange={update("password")}
                showToggle
                visible={showPass}
                onToggleVisible={() => setShowPass((v) => !v)}
                autoComplete="new-password"
              />
              <FormField
                label="Повторите пароль"
                value={form.confirm}
                onChange={update("confirm")}
                showToggle
                visible={showPass2}
                onToggleVisible={() => setShowPass2((v) => !v)}
                autoComplete="new-password"
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

              <button type="submit" className="auth__submit">
                <div className="auth__submit-label">Зарегистрироваться</div>
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
}
