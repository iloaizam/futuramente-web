export function asset(path) {
  if (!path) return path;
  const clean = String(path).replace(/^\/+/, ''); // quita / al inicio
  return `${import.meta.env.BASE_URL}${clean}`;
}