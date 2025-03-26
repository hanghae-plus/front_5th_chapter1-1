export function cleanDuplicateSlashes(str) {
  return str.replace(/\/+/g, "/");
}
