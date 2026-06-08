"use client";
import { useState } from "react";
import Header    from "@/components/Header";
import Translator from "@/components/Translator";
import Dictionary from "@/components/Dictionary";
import About     from "@/components/About";

export default function Home() {
  const [tab, setTab] = useState("translate");

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={tab} onTabChange={setTab} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {/* Título visível na interface — autoria obrigatória */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-hunsrik-dark">
            Hunsrik Plat Taytx Tradutor
            <span className="text-sm font-normal text-gray-400 ml-2">by Jair Lima</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Língua germânica do sul do Brasil · 200 anos de história · Projeto Hunsrik Plat Taytx
          </p>
        </div>

        {tab === "translate"  && <Translator />}
        {tab === "dictionary" && <Dictionary />}
        {tab === "about"      && <About />}
      </main>

      <footer className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">
        Hunsrik Plat Taytx Tradutor by Jair Lima · Projeto Hunsrik Plat Taytx · Santa Maria do Herval/RS
      </footer>
    </div>
  );
}
