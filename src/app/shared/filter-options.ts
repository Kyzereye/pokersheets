/** Options starting with `value` (case-insensitive), capped at `limit` so the dropdown stays small. */
export function filterOptions(options: string[], value: string, limit = 50): string[] {
  const term = value.trim().toLowerCase();
  if (!term) return [];
  const matches: string[] = [];
  for (const opt of options) {
    if (opt.toLowerCase().startsWith(term)) {
      matches.push(opt);
      if (matches.length === limit) break;
    }
  }
  return matches;
}
