/**
 * Lightweight product search used by the navbar search box and the
 * /products results page.
 *
 * It indexes every product together with its product group (category) and
 * matches on the product name, the category name, the category blurb and the
 * slug keywords. A small synonym map covers common abbreviations so shoppers
 * can type "bp" instead of "blood pressure".
 */
import {
  PRODUCTS,
  PRODUCT_GROUPS,
  type Product,
  type ProductGroup,
} from "@/data/catalog";

export type ProductSearchResult = {
  product: Product;
  group?: ProductGroup;
  score: number;
};

/** Common abbreviations / alternate spellings shoppers actually type. */
const SYNONYMS: Record<string, string[]> = {
  bp: ["blood pressure"],
  wc: ["wheelchair"],
  "wheel chair": ["wheelchair"],
  spo2: ["oximeter"],
  o2: ["oximeter", "respiratory", "nebulizer"],
  oxygen: ["oximeter", "respiratory"],
  temperature: ["thermometer"],
  thermometer: ["temperature"],
  nebuliser: ["nebulizer"],
  nebulizer: ["nebuliser"],
  crutch: ["crutches"],
  diaper: ["diapers"],
  gloves: ["glove"],
  glove: ["gloves"],
  bedsore: ["air mattress"],
  catheter: ["urine pot"],
  potty: ["commode"],
  rollator: ["walking"],
  cane: ["walking stick"],
  mask: ["masks"],
  masks: ["mask"],
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

type IndexedProduct = {
  product: Product;
  group?: ProductGroup;
  name: string;
  groupName: string;
  haystack: string;
};

const INDEX: IndexedProduct[] = PRODUCTS.map((product) => {
  const group = PRODUCT_GROUPS.find((g) => g.slug === product.group);
  const haystack = normalize(
    [
      product.name,
      product.slug.replace(/-/g, " "),
      product.group.replace(/-/g, " "),
      product.description ?? "",
      group?.name ?? "",
      group?.blurb ?? "",
      group?.slug.replace(/-/g, " ") ?? "",
    ]
      .filter(Boolean)
      .join(" "),
  );
  return {
    product,
    group,
    name: normalize(product.name),
    groupName: normalize(group?.name ?? ""),
    haystack,
  };
});

/**
 * Search the catalog. Returns every matching product ranked by relevance.
 * An empty query returns no results.
 */
export function searchProducts(query: string): ProductSearchResult[] {
  const q = normalize(query);
  if (!q) return [];

  const tokens = Array.from(new Set(q.split(" ").filter(Boolean)));

  // Each token matches itself, any single-word synonym, or a multi-word
  // synonym as one full phrase. Splitting a multi-word synonym into loose
  // words made "bp" (→ "blood pressure") match any product that merely
  // mentions "pressure", so those now have to appear contiguously instead.
  const expansions = tokens.map((token) => {
    const extra = SYNONYMS[token] ?? [];
    const words = Array.from(
      new Set([token, ...extra.filter((s) => !s.includes(" ")).map(normalize)]),
    ).filter(Boolean);
    const phrases = extra.map(normalize).filter((s) => s.includes(" "));
    return { words, phrases };
  });

  const results: ProductSearchResult[] = [];

  for (const item of INDEX) {
    const nameWords = item.name.split(" ");
    let total = 0;
    let matchedEveryToken = true;

    for (const { words, phrases } of expansions) {
      let tokenScore = 0;
      for (const term of words) {
        if (item.name === term) tokenScore = Math.max(tokenScore, 12);
        else if (item.name.startsWith(term)) tokenScore = Math.max(tokenScore, 10);
        else if (nameWords.some((w) => w.startsWith(term)))
          tokenScore = Math.max(tokenScore, 8);
        else if (item.name.includes(term)) tokenScore = Math.max(tokenScore, 7);
        else if (item.groupName.includes(term)) tokenScore = Math.max(tokenScore, 5);
        else if (item.haystack.includes(term)) tokenScore = Math.max(tokenScore, 2);
      }
      // A multi-word synonym only counts when its full phrase is present, so
      // "bp" cannot satisfy itself with a stray "pressure" in unrelated copy.
      for (const phrase of phrases) {
        if (item.name === phrase) tokenScore = Math.max(tokenScore, 12);
        else if (item.name.startsWith(phrase)) tokenScore = Math.max(tokenScore, 10);
        else if (item.name.includes(phrase)) tokenScore = Math.max(tokenScore, 7);
        else if (item.groupName.includes(phrase)) tokenScore = Math.max(tokenScore, 5);
        else if (item.haystack.includes(phrase)) tokenScore = Math.max(tokenScore, 2);
      }
      if (tokenScore === 0) {
        matchedEveryToken = false;
        break;
      }
      total += tokenScore;
    }

    if (matchedEveryToken) {
      results.push({ product: item.product, group: item.group, score: total });
    }
  }

  results.sort(
    (a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name),
  );
  return results;
}
