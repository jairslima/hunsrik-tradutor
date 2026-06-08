"use client";
import { useState } from "react";

export default function Header({ activeTab, onTabChange }: {
  activeTab: string;
  onTabChange: (t: string) => void;
}) {
  const tabs = [
    { id: "translate", label: "Tradutor" },
    { id: "dictionary", label: "Dicionário" },
    { id: "about", label: "Sobre o Projeto" },
  ];

  return (
    <header className="bg-hunsrik-dark text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-hunsrik-gold">
              Hunsrik Plat Taytx
            </h1>
            <p className="text-xs text-gray-300 mt-0.5">
              Tradutor Oficial · Projeto Hunsrik Plat Taytx · Santa Maria do Herval/RS
            </p>
          </div>
          <nav className="flex gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === t.id
                    ? "bg-hunsrik-green text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
