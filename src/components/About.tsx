export default function About() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="panel p-6">
        <h2 className="text-xl font-bold text-hunsrik-green mb-4">
          O Projeto Hunsrik Plat Taytx
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          O <strong>Hunsrik Plat Taytx</strong> é uma língua germânica falada por cerca de 1,5 a 3 milhões
          de pessoas no sul do Brasil, descendente do dialeto Hunsrückisch trazido pelos imigrantes alemães
          a partir de 1824. É considerada por muitos pesquisadores a segunda língua mais falada no Brasil.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Em fevereiro de 2004, a equipe de linguistas da <strong>SIL – Sociedade Internacional de
          Linguística</strong>, liderada pela Dra. Úrsula Wiesemann, chegou a Santa Maria do Herval/RS
          e iniciou o trabalho de codificação da escrita. Desde então, o projeto coordenado por
          <strong> Solange Hamester Johann</strong> produziu dicionários, materiais didáticos, tradução
          do Novo Testamento (SBB, 2022) e alcançou o Google Tradutor em 2024.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { ano: "2004", texto: "Início do Projeto com a SIL Internacional" },
          { ano: "2007", texto: "Registro no Ethnologue/UNESCO — código HRX" },
          { ano: "2012", texto: "Lei Estadual RS 14.061 — Patrimônio Cultural" },
          { ano: "2022", texto: "Novo Testamento completo publicado pela SBB" },
          { ano: "2024", texto: "Inclusão no Google Tradutor" },
          { ano: "2025", texto: "21 anos do Projeto · Antigo Testamento em andamento" },
        ].map((m) => (
          <div key={m.ano} className="panel p-4 flex gap-4 items-start">
            <span className="text-2xl font-bold text-hunsrik-gold">{m.ano}</span>
            <p className="text-gray-700 text-sm leading-relaxed">{m.texto}</p>
          </div>
        ))}
      </div>

      <div className="panel p-6 bg-hunsrik-dark text-white">
        <h3 className="font-bold text-hunsrik-gold mb-3">Sobre este tradutor</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Este sistema utiliza o <strong>dicionário oficial</strong> do Projeto Hunsrik Plat Taytx
          (6.833 verbetes, letras A–Z) e o corpus de textos bíblicos e literários bilíngues como base
          para geração de traduções. As traduções são rascunhos automáticos sujeitos à revisão de
          Dra. Solange Hamester Johann.
        </p>
        <p className="text-gray-400 text-xs mt-3">
          Desenvolvido por Jair Lima · Projeto Hunsrik Plat Taytx · Santa Maria do Herval/RS
        </p>
      </div>
    </div>
  );
}
