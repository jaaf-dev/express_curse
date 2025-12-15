export function parseQueryIntStrict(raw?: string | string[]): number | null {
  const value = Array.isArray(raw) ? raw[0] : raw;

  if (typeof value !== 'string') return null;
  // Solo dígitos (entero positivo, sin signo)
  if (!/^\d+$/.test(value)) return null;
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? null : n;
}

