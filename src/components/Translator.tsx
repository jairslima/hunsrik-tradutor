"use client";
import { useState, useCallback } from "react";

type Direction = "pt-hrx" | "hrx-pt";

export default function Translator() {
  const [input, setInput]         = useState("");
  const [output, setOutput]       = useState("");
  const [direction, setDirection] = useState<Direction>("pt-hrx");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [dictUsed, setDictUsed]   = useState("");

  const translate = useCallback(async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setOutput("");
    setDictUsed("");

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, direction }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro desconhecido");
      setOutput(data.translation);
      if (data.dictContext) setDictUsed(data.dictContext);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao traduzir.");
    } finally {
      setLoading(false);
    }
  }, [input, direction]);

  const swap = () => {
    setDirection((d) => (d === "pt-hrx" ? "hrx-pt" : "pt-hrx"));
    setInput(output);
    setOutput("");
    setDictUsed("");
  };

  const srcLabel = direction === "pt-hrx" ? "Português" : "Hunsrik Plat Taytx";
  const dstLabel = direction === "pt-hrx" ? "Hunsrik Plat Taytx" : "Português";

  return (
    <div className="space-y-4">
      {/* Barra de direção */}
      <div className="flex items-center gap-3 justify-center">
        <span className={`font-semibold text-sm px-3 py-1 rounded-full ${direction === "pt-hrx" ? "bg-hunsrik-green text-white" : "bg-gray-100 text-gray-600"}`}>
          {srcLabel}
        </span>
        <button
          onClick={swap}
          title="Inverter direção"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors text-lg"
        >
          ⇄
        </button>
        <span className={`font-semibold text-sm px-3 py-1 rounded-full ${direction === "hrx-pt" ? "bg-hunsrik-green text-white" : "bg-gray-100 text-gray-600"}`}>
          {dstLabel}
        </span>
      </div>

      {/* Painéis de texto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Entrada */}
        <div className="panel p-4 flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {srcLabel}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) translate();
            }}
            placeholder={
              direction === "pt-hrx"
                ? "Digite ou cole o texto em português..."
                : "Schrayw tes taytx uf Hunsrik..."
            }
            className="flex-1 resize-none text-base leading-relaxed p-2 min-h-[200px] border-0 focus:outline-none"
            maxLength={4000}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{input.length}/4.000</span>
            <button
              onClick={translate}
              disabled={loading || !input.trim()}
              className="btn-primary text-sm"
            >
              {loading ? "Traduzindo..." : "Traduzir (Ctrl+Enter)"}
            </button>
          </div>
        </div>

        {/* Saída */}
        <div className="panel p-4 flex flex-col gap-2 bg-hunsrik-light">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {dstLabel}
          </label>
          {error ? (
            <p className="text-red-600 text-sm p-2 bg-red-50 rounded-lg">{error}</p>
          ) : loading ? (
            <div className="flex items-center gap-2 text-gray-400 p-2">
              <span className="animate-spin">⏳</span> Traduzindo com base no dicionário oficial...
            </div>
          ) : (
            <div className="flex-1 min-h-[200px] text-base leading-relaxed p-2 whitespace-pre-wrap select-all">
              {output || (
                <span className="text-gray-300 italic">A tradução aparecerá aqui...</span>
              )}
            </div>
          )}
          {output && (
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="text-xs text-gray-500 hover:text-hunsrik-green transition-colors"
              >
                Copiar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Verbetes usados */}
      {dictUsed && (
        <details className="panel p-4 text-xs text-gray-500">
          <summary className="cursor-pointer font-medium text-gray-600 hover:text-hunsrik-green">
            Verbetes do dicionário consultados nesta tradução
          </summary>
          <pre className="mt-3 font-mono text-xs leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
            {dictUsed}
          </pre>
        </details>
      )}

      {/* Aviso de revisão */}
      <p className="text-xs text-center text-gray-400">
        Rascunho automático gerado com base no dicionário oficial e corpus do Projeto Hunsrik Plat Taytx.
        Sujeito à revisão de Dra. Solange Hamester Johann.
      </p>
    </div>
  );
}
