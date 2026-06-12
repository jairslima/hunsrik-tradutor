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

## Pipeline de Tradução Bíblica (AT)

Scripts em `tools/` para extrair e traduzir livros do AT.

### Fonte de extração

**DOCX oficial SBB:** `C:\Users\jairs\Documents\Biblioteca\DOC\Biblia\BIBLIA DE ESTUDO NTLH - AT E NT.docx`
Copyright 2005 Sociedade Bíblica do Brasil. Contém AT completo (39 livros) com estrutura uniforme.

### Scripts do pipeline

| Script | Função | Input | Output |
|--------|--------|-------|--------|
| `1_extrai_livro.py` | Extrai qualquer livro AT do DOCX NTLH SBB | DOCX oficial SBB | `data/{livro}_ntlh.json` |
| `2_traduz_proverbios.py` | Traduz qualquer livro AT (genérico) | `data/{livro}_ntlh.json` | `data/{livro}_hunsrik.json` |
| `3_gera_docx.py` | Gera DOCX bilíngue HRX/NTLH | `data/{livro}_hunsrik.json` | `{LIVRO}_Hunsrik.docx` |

### Uso dos scripts

```bash
# Listar todos os livros disponíveis
python 1_extrai_livro.py --lista

# Extrair qualquer livro
python 1_extrai_livro.py --livro eclesiastes
python 1_extrai_livro.py --livro salmos
python 1_extrai_livro.py --livro 1samuel

# Traduzir
python 2_traduz_proverbios.py --livro eclesiastes

# Gerar DOCX bilíngue
python 3_gera_docx.py --livro eclesiastes
```

### Backends em cascata (automático)

| # | Backend | Modelo | Limite gratuito |
|---|---------|--------|-----------------|
| 1 | Gemini 2.5 Flash | gemini-2.5-flash | 20 req/dia |
| 2 | Groq | llama-3.3-70b-versatile | 14.400 req/dia |
| 3 | Cerebras | llama-3.3-70b | 2.000 tok/s |
| 4 | SambaNova | Meta-Llama-3.3-70B | free tier |
| 5 | Mistral | mistral-large-latest | pago/uso |
| 6 | OpenRouter | gemini-2.5-flash | pago/uso |

Quando um backend esgota a cota, o script avança automaticamente para o próximo.
Chaves configuradas em `.env.local` (nunca versionado).

### Status dos livros

| Livro | Caps | Versículos | Status |
|-------|------|-----------|--------|
| Provérbios | 31 | 900 | Completo — entregue Dra. Solange 12/06/2026 |
| Eclesiastes | 12 | 220 | Tradução completa 12/06/2026; DOCX gerado |
| Salmos | 150 | 2.461 | Traduzido manualmente pela Dra. Solange — aguardando envio para estudo/melhoria |

**Lições do pipeline:**
- `max_output_tokens=32768` obrigatório (com 8192 o JSON é truncado em caps grandes)
- `thinking_budget=0` elimina tokens de raciocínio que consomem budget invisível
- Detectar `"PerDay"` no erro 429 e parar imediatamente
- Backends em cascata resolvem o problema de cota sem intervenção manual

## Próximos Passos
1. **Eclesiastes:** concluir tradução e gerar DOCX para revisão da Dra. Solange
2. **Salmos:** quando chegar, ESTUDAR e MELHORAR (nunca retraduzir — já está completo)
3. **Integrar AT no site:** adicionar livros traduzidos ao corpus RAG
4. **Qualidade:** aplicar correções da Dra. Solange ao SYSTEM_PROMPT após revisão de Provérbios
5. **SBB:** contato formal sobre o projeto do AT completo
6. **Google Translate:** preparar pacote de dados com 30+ pares paralelos para submissão
7. **IPHAN/MinC:** candidatura a edital de preservação lingüística

## Problemas Conhecidos
- Qualidade de tradução limitada pelo tamanho do dicionário e ausência do corpus paralelo completo do NT
- Arquivo `public/dicionario_hunsrik.json` (735KB) é carregado na memória do servidor a cada cold start
- Limite de 4.000 caracteres por tradução (configurável em `route.ts`)

## Acervo de Origem
- **Pasta:** `C:\Users\jairs\Documents\Hunsrich\`
- **Arquivos gerados:** `dicionario_hunsrik.csv`, `dicionario_hunsrik.json`, `pares_google_tradutor.csv`, `gramatica_hunsrik_descritiva.txt`
- **Co-autores do projeto lingüístico:** Pr. Jair Lima + Dra. Solange Hamester Johann
