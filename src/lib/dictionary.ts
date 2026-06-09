import dicData from "../../public/dicionario_hunsrik.json";

type DicEntry = { portugues: string; hunsrik: string; letra: string };
const dic = dicData as Record<string, DicEntry>;

function findEntries(text: string, maxEntries = 60): DicEntry[] {
  const words = text
    .toLowerCase()
    .replace(/[.,;:!?()]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const found: DicEntry[] = [];
  const seen = new Set<string>();

  for (const word of words) {
    if (seen.has(word)) continue;
    seen.add(word);

    if (dic[word]) {
      found.push(dic[word]);
      continue;
    }

    if (word.length >= 4) {
      const prefix = word.slice(0, 5);
      for (const key of Object.keys(dic)) {
        if (key.startsWith(prefix) && !seen.has(key)) {
          found.push(dic[key]);
          seen.add(key);
          break;
        }
      }
    }
  }

  return found.slice(0, maxEntries);
}

export function lookupRelevant(text: string, maxEntries = 60): string {
  return findEntries(text, maxEntries)
    .map((e) => `${e.portugues} = ${e.hunsrik}`)
    .join("\n");
}

export function lookupHunsrikWords(text: string, maxEntries = 60): string[] {
  return findEntries(text, maxEntries).map((e) => e.hunsrik);
}

export function searchDictionary(query: string, limit = 20): DicEntry[] {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 2) return [];

  const results: DicEntry[] = [];
  for (const [key, entry] of Object.entries(dic)) {
    if (
      key.includes(q) ||
      entry.hunsrik.toLowerCase().includes(q) ||
      entry.portugues.toLowerCase().includes(q)
    ) {
      results.push(entry);
      if (results.length >= limit) break;
    }
  }
  return results;
}
