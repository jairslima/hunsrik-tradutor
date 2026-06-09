# Hunsrik Tradutor by Jair Lima

## Descrição
Site público de tradução bidirecional Português ↔ Hunsrik Plat Taytx (código HRX), idioma germânico falado no sul do Brasil por ~1,5-3 milhões de descendentes de imigrantes. Projeto vinculado à iniciativa de preservação lingüística e ao trabalho da SBB (Sociedade Bíblica do Brasil) de tradução do Novo Testamento em Hunsrik (2022), co-autorado por Pr. Jair Lima e Dra. Solange Hamester Johann.

## URLs
- **Produção:** https://hunsrik-tradutor.vercel.app
- **GitHub:** https://github.com/jairslima/hunsrik-tradutor
- **Vercel:** https://vercel.com/jair-limas-projects/hunsrik-tradutor

## Stack
- **Framework:** Next.js 15.5.19 (App Router)
- **UI:** React 19 + Tailwind CSS 3.4
- **IA:** Google Gemini 2.5 Flash via `@google/generative-ai` ^0.24.1
- **Deploy:** Vercel (plano Hobby)

## Variáveis de Ambiente
- `GEMINI_API_KEY` — chave da API Gemini (configurada em todos os ambientes Vercel)
- Arquivo `.env.local` local: nunca comitado

## Estrutura de Pastas
```
HunsrikTradutor/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal (3 abas)
│   │   └── api/
│   │       ├── translate/route.ts  # POST: tradução via Gemini
│   │       └── dictionary/route.ts # GET: busca no dicionário
│   ├── components/
│   │   ├── Translator.tsx        # Aba tradução PT↔HRX
│   │   ├── Dictionary.tsx        # Aba dicionário (busca debounce 250ms)
│   │   ├── About.tsx             # Aba sobre o projeto
│   │   └── Header.tsx            # Navegação por abas
│   └── lib/
│       ├── dictionary.ts         # Carrega JSON, lookupRelevant(), searchDictionary()
│       └── hunsrik-prompt.ts     # SYSTEM_PROMPT com regras ortográficas + buildUserPrompt()
├── public/
│   └── dicionario_hunsrik.json   # 6.833 entradas (735KB)
├── vercel.json
├── tailwind.config.ts
└── package.json
```

## Comandos
```bash
npm run dev       # Desenvolvimento (http://localhost:3000)
npm run build     # Build de produção
npx vercel --prod # Deploy manual para produção
git push origin master  # Push + deploy automático via GitHub
```

## Dicionário
- **Origem:** Arquivo `C:\Users\jairs\Documents\Hunsrich\` (26 arquivos Dic*.docx)
- **Extração:** Script Python com correção de quebras de parágrafo e filtro de contaminação
- **Entradas:** 6.833 pares PT → HRX
- **Arquivo:** `public/dicionario_hunsrik.json` (keyed por PT minúsculo)

## Funcionalidades
- Tradução PT → HRX com injeção de contexto do dicionário (até 60 entradas relevantes)
- Tradução HRX → PT (sem contexto de dicionário)
- Busca no dicionário por termo PT ou HRX (tempo real, debounce 250ms)
- Atalho Ctrl+Enter para traduzir
- Exibe entradas do dicionário usadas na tradução

## Decisões Arquiteturais
- **Gemini 2.5 Flash** escolhido por: gratuidade (1M tokens/dia), qualidade e chave já disponível no projeto TradutorInglesEspanhol
- **RAG manual** via `lookupRelevant()`: encontra entradas relevantes por tokenização simples do texto PT
- Dicionário servido como arquivo estático em `public/` — carregado uma vez no servidor e cacheado em memória
- Sem banco de dados: tudo em arquivo JSON estático para manter custo zero
- **Next.js 15.5.19** obrigatório: versões < 15.5.19 contêm CVE-2025-66478 e são bloqueadas pelo Vercel

## Estado Atual
- Site em produção: https://hunsrik-tradutor.vercel.app
- Tradução funcional PT↔HRX com dicionário de 6.833 entradas
- Deploy automático via push no GitHub (branch master)

## Próximos Passos
1. **Qualidade de tradução:** quando NT digital chegar, expandir corpus para 7.000+ pares paralelos e melhorar o SYSTEM_PROMPT
2. **Revisão da Dra. Solange:** enviar gramática descritiva para validação
3. **SBB:** contato formal sobre o projeto do Antigo Testamento
4. **Google Translate:** preparar pacote de dados com 30+ pares paralelos para submissão
5. **Domínio personalizado:** configurar domínio próprio (ex: tradutor.hunsrik.com.br)
6. **Publicação acadêmica:** artigo sobre a digitalização do acervo e o sistema de tradução
7. **IPHAN/MinC:** candidatura a edital de preservação lingüística

## Problemas Conhecidos
- Qualidade de tradução limitada pelo tamanho do dicionário e ausência do corpus paralelo completo do NT
- Arquivo `public/dicionario_hunsrik.json` (735KB) é carregado na memória do servidor a cada cold start
- Limite de 4.000 caracteres por tradução (configurável em `route.ts`)

## Acervo de Origem
- **Pasta:** `C:\Users\jairs\Documents\Hunsrich\`
- **Arquivos gerados:** `dicionario_hunsrik.csv`, `dicionario_hunsrik.json`, `pares_google_tradutor.csv`, `gramatica_hunsrik_descritiva.txt`
- **Co-autores do projeto lingüístico:** Pr. Jair Lima + Dra. Solange Hamester Johann
