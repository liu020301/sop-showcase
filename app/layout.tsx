import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "易链 · 全流程 SOP",
  description: "从业务发起到资金闭环，一页看懂公司全流程。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
