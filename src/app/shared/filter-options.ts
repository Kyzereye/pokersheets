export function filterOptions(options: string[], value: string): string[] {
  const term = value.trim().toLowerCase();
  if (!term) return [];
  return options.filter(opt => opt.toLowerCase().startsWith(term));
}
