import { useEffect, useState } from "react";
import { authApi } from "./api";

// Подключи этот компонент на роут "/verify-email" (ссылка из письма ведёт именно туда).
// Пример с react-router: <Route path="/verify-email" element={<VerifyEmail />} />
export function VerifyEmail() {
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("Подтверждаем ваш email...");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setStatus("error");
      setMessage("Ссылка недействительна: отсутствует токен.");
      return;
    }

    authApi
      .verifyEmail(token)
      .then((res) => {
        setStatus("success");
        setMessage(res.message || "Email подтверждён!");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div style={{ fontSize: "40px" }}>
        {status === "loading" && "⏳"}
        {status === "success" && "✅"}
        {status === "error" && "❌"}
      </div>
      <div style={{ fontSize: "18px", maxWidth: "400px" }}>{message}</div>
      {status !== "loading" && (
        <a href="/" style={{ color: "#6c5ce7", fontWeight: "bold" }}>
          Вернуться на страницу входа
        </a>
      )}
    </div>
  );
}
