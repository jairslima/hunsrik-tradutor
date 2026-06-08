import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hunsrik Plat Taytx Tradutor by Jair Lima",
  description:
    "Tradutor oficial do Hunsrik Plat Taytx — língua germânica falada no sul do Brasil. Projeto Hunsrik Plat Taytx, Santa Maria do Herval/RS.",
  keywords: ["hunsrik", "hunsriquiano", "tradutor", "língua germânica", "Rio Grande do Sul"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
