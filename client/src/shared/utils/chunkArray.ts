export function chunkArray<T> (array: T[], size: number): T[][] {
  const res = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    res.push(chunk);
  }
  return res;
}
