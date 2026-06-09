import path from "path";
import fs from "fs";

interface Verse {
  u: string;
  t: string;
}

let corpus: Verse[] | null = null;

function loadCorpus(): Verse[] {
  if (!corpus) {
    const filePath = path.join(process.cwd(), "src", "data", "nthunsrik.json");
    corpus = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Verse[];
  }
  return corpus;
}

export function findRelevantVerses(hunsrikWords: string[], maxVerses = 8): string {
  if (hunsrikWords.length === 0) return "";

  const verses = loadCorpus();

  const targets = hunsrikWords
    .flatMap(w => w.split(/[\s;,]+/))
    .map(w => w.toLowerCase().replace(/[^a-zëüäöáéíóúàèìòùâêîôû']/gi, ""))
    .filter(w => w.length > 3);

  if (targets.length === 0) return "";

  const scored = verses
    .map(v => {
      const text = v.t.toLowerCase();
      const score = targets.reduce((acc, word) => acc + (text.includes(word) ? 1 : 0), 0);
      return { verse: v, score };
    })
    .filter(x => x.score > 0);

  scored.sort((a, b) => b.score - a.score);

  return scored
    .slice(0, maxVerses)
    .map(x => `[${x.verse.u}] ${x.verse.t}`)
    .join("\n");
}
