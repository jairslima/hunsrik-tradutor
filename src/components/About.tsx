import Image from "next/image";

export default function About() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">

      {/* Citação de Solange + foto */}
      <div className="panel p-6 flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <Image
            src="/solange.jpg"
            alt="Dra. Solange Hamester Johann — coordenadora do Projeto Hunsrik Plat Taytx"
            width={140}
            height={160}
            className="rounded-lg object-cover shadow-md"
          />
          <p className="text-xs text-center text-gray-400 mt-1 max-w-[140px]">
            Dra. Solange Hamester Johann
          </p>
        </div>
        <div>
          <blockquote className="italic text-gray-600 leading-relaxed border-l-4 border-hunsrik-gold pl-4 mb-3">
            "Esta é uma língua germânica viva, que existe há mais de 1.500 anos.
            Era falada pelo imperador Carlos Magno e pelos povos franco-germânicos
            das margens dos rios Mosela e Reno, que emigraram para os mais diversos
            países do mundo, em diferentes épocas e, por isso, é falada em muitos
            países do planeta."
          </blockquote>
          <p className="text-sm text-gray-500">
            <strong>Solange Hamester Johann</strong> — coordenadora do Projeto Hunsrik Plat Taytx,
            Santa Maria do Herval/RS
          </p>
        </div>
      </div>

      {/* Texto introdutório */}
      <div className="panel p-6">
        <h2 className="text-xl font-bold text-hunsrik-green mb-4">
          O Projeto Hunsrik Plat Taytx
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          O <strong>Hunsrik Plat Taytx</strong> é uma língua germânica com mais de 1.500 anos de
          existência, falada por mais de 2 milhões de pessoas no sul do Brasil — considerada
          a segunda língua mais falada no país. Chegou ao Brasil com os imigrantes alemães a
          partir de 1824, descendente do dialeto Hunsrückisch das margens dos rios Mosela e
          Reno. Também é língua oficial de Luxemburgo e falada em regiões da Alemanha,
          Canadá (~30 mil falantes) e Alasca (~20 mil falantes).
        </p>
        <p className="text-gray-700 leading-relaxed">
          Em fevereiro de 2004, iniciaram-se as pesquisas para codificação e registro da língua
          em Santa Maria do Herval/RS, sob coordenação de <strong>Solange Hamester Johann</strong>.
          Em agosto de 2007 foi firmada a parceria formal com a <strong>Sociedade Bíblica do
          Brasil (SBB)</strong>, que culminou na publicação do Novo Testamento completo em novembro
          de 2022 — 8 anos de trabalho de tradução. Em 2024 o Hunsrik foi incluído no
          Google Tradutor.
        </p>
      </div>

      {/* Linha do tempo */}
      <div>
        <h3 className="text-lg font-bold text-hunsrik-dark mb-3 px-1">Linha do tempo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { ano: "2004", texto: "Início do Projeto — pesquisa e codificação da escrita (fevereiro)" },
            { ano: "2007", texto: "Parceria formal com a SBB (agosto)" },
            { ano: "2010", texto: "Dicionário Infantil Ilustrado publicado" },
            { ano: "2011", texto: "Início do ensino do Hunsrik em escolas municipais" },
            { ano: "2012", texto: "Lei Estadual RS nº 14.061 — Patrimônio Histórico e Cultural" },
            { ano: "2014", texto: "Tradução oficial de O Pequeno Príncipe" },
            { ano: "2017–18", texto: "Conferências de Estrasburgo (UE) — continuidade cultural" },
            { ano: "2022", texto: "Novo Testamento completo publicado pela SBB (novembro)" },
            { ano: "2024", texto: "Inclusão no Google Tradutor" },
            { ano: "2026", texto: "22 anos do Projeto · Antigo Testamento em andamento" },
          ].map((m) => (
            <div key={m.ano} className="panel p-4 flex gap-4 items-start">
              <span className="text-xl font-bold text-hunsrik-gold whitespace-nowrap">{m.ano}</span>
              <p className="text-gray-700 text-sm leading-relaxed">{m.texto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Equipe de tradução do NT */}
      <div className="panel p-6">
        <h3 className="font-bold text-hunsrik-green mb-3">
          Equipe de tradução do Novo Testamento (SBB, 2022)
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li><strong>Solange Hamester Johann</strong> — tradutora e coordenadora do projeto</li>
          <li><strong>Mabel Dewes</strong> — tradutora</li>
          <li><strong>Raquel Milena Scheid</strong> — tradutora</li>
          <li><strong>Vilson Scholz</strong> — consultor de tradução (SBB)</li>
        </ul>
        <p className="text-xs text-gray-400 mt-3">
          Lançamento: 04/11/2022 · Museu Histórico Visconde de São Leopoldo, São Leopoldo/RS
        </p>
      </div>

      {/* Sobre o tradutor */}
      <div className="panel p-6 bg-hunsrik-dark text-white">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-1">
            <h3 className="font-bold text-hunsrik-gold mb-3">Sobre este tradutor</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Este sistema utiliza o <strong>dicionário oficial</strong> do Projeto Hunsrik Plat Taytx
              (6.833 verbetes, letras A–Z) e o corpus do Novo Testamento completo em Hunsrik
              (7.930 versículos, SBB 2022) como base para geração de traduções assistidas por IA.
              As traduções são rascunhos automáticos sujeitos à revisão de Dra. Solange Hamester Johann.
            </p>
            <p className="text-gray-400 text-xs mt-3">
              Desenvolvido por Jair Lima · Projeto Hunsrik Plat Taytx · Santa Maria do Herval/RS ·{" "}
              <a href="mailto:projetohunsrik@gmail.com" className="underline hover:text-hunsrik-gold">
                projetohunsrik@gmail.com
              </a>
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center mx-auto sm:mx-0">
            <Image
              src="/qrcode-hunsrik.png"
              alt="QR Code — www.hunsrik.com.br"
              width={100}
              height={100}
              className="rounded bg-white p-1"
            />
            <p className="text-gray-400 text-xs mt-1 text-center">www.hunsrik.com.br</p>
          </div>
        </div>
      </div>

    </div>
  );
}
