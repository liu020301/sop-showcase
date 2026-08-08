"use client";

import { FormEvent, useEffect, useState } from "react";

const ACCESS_KEY = "yilian-sop-access";
const PASSWORD = "lzh231!";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [granted, setGranted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setGranted(sessionStorage.getItem(ACCESS_KEY) === "granted");
    setReady(true);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === PASSWORD) {
      sessionStorage.setItem(ACCESS_KEY, "granted");
      setGranted(true);
      setError(false);
      return;
    }
    setError(true);
    setPassword("");
  }

  if (!ready) return <div className="auth-loading" aria-label="正在加载" />;
  if (granted) return children;

  return (
    <main className="auth-page">
      <div className="auth-orbit auth-orbit-one" />
      <div className="auth-orbit auth-orbit-two" />
      <section className="auth-card">
        <div className="auth-brand"><span>YC</span> 易链 · SOP</div>
        <p className="auth-kicker">INTERNAL PRESENTATION</p>
        <h1>全流程协作展示</h1>
        <p className="auth-copy">内部汇报资料，请输入访问密码继续。</p>
        <form onSubmit={submit}>
          <label htmlFor="access-password">访问密码</label>
          <div className="auth-input-row">
            <input
              id="access-password"
              type="password"
              value={password}
              onChange={(event) => { setPassword(event.target.value); setError(false); }}
              placeholder="请输入密码"
              autoFocus
              autoComplete="current-password"
              aria-invalid={error}
            />
            <button type="submit">进入展示 <span>↗</span></button>
          </div>
          <p className={error ? "auth-error is-visible" : "auth-error"}>密码不正确，请重新输入。</p>
        </form>
        <footer><span>易链业务全景</span><span>2026</span></footer>
      </section>
    </main>
  );
}
