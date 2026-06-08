"use client";
import { useState, useEffect } from "react";

type Entry = { portugues: string; hunsrik: string; letra: string };

export default function Dictionary() {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    setLoading(true);
    const t = setTimeout(async () => {
      const res  = await fetch(`/api/dictionary?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="panel p-4">
        <h2 className="font-bold text-hunsrik-green mb-3">
          Dicionário Oficial · 6.833 verbetes
        </h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar em português ou em Hunsrik..."
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-hunsrik-green"
          autoFocus
        />
        <p className="text-xs text-gray-400 mt-2">
          Digite pelo menos 2 letras. A busca funciona nos dois idiomas.
        </p>
      </div>

      {loading && (
        <p className="text-center text-gray-400 text-sm">Buscando...</p>
      )}

      {results.length > 0 && (
        <div className="panel overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-hunsrik-dark text-white">
              <tr>
                <th className="text-left px-4 py-2 font-semibold w-8">A-Z</th>
                <th className="text-left px-4 py-2 font-semibold">Português</th>
                <th className="text-left px-4 py-2 font-semibold">Hunsrik Plat Taytx</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 text-gray-400 font-mono text-xs">{r.letra}</td>
                  <td className="px-4 py-2 font-medium text-gray-800">{r.portugues}</td>
                  <td className="px-4 py-2 text-hunsrik-green font-medium">{r.hunsrik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {query.length >= 2 && results.length === 0 && !loading && (
        <div className="panel p-6 text-center text-gray-400">
          <p>Nenhum verbete encontrado para <strong>"{query}"</strong>.</p>
          <p className="text-xs mt-1">Tente uma forma diferente da palavra ou verifique a ortografia.</p>
        </div>
      )}
    </div>
  );
}
