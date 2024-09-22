export function generateUniqueID() {
  const id = Math.floor(Math.random() * 500) + Date.now();
  return id;
}
