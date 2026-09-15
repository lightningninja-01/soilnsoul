const REPLACEMENTS: Array<[string, string]> = [
  ['â€”', '-'],
  ['â€“', '-'],
  ['â€˜', "'"],
  ['â€™', "'"],
  ['â€œ', '"'],
  ['â€', '"'],
  ['â€¦', '...'],
  ['â‚¹', 'Rs '],
  ['â˜…', 'star'],
  ['\u00a0', ' '],
];

export function normalizeSeoText(value: string): string {
  let output = value;
  for (const [from, to] of REPLACEMENTS) {
    output = output.split(from).join(to);
  }
  return output;
}

export function normalizeSeoPage<T>(value: T): T {
  if (typeof value === 'string') {
    return normalizeSeoText(value) as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeSeoPage(item)) as unknown as T;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    const mapped = Object.fromEntries(entries.map(([key, val]) => [key, normalizeSeoPage(val)]));
    return mapped as T;
  }

  return value;
}
