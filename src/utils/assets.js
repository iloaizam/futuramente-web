export function asset(path) {
  if (!path) return path;
  if (/^(?:[a-z]+:)?\/\//i.test(path) || /^(?:data|blob):/i.test(path)) {
    return path;
  }
  const clean = String(path).replace(/^\/+/, ''); // quita / al inicio
  return `${import.meta.env.BASE_URL}${clean}`;
}
