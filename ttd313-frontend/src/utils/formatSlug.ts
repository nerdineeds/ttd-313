// utils/formatSlug.ts
export function formatSlug(productName: string): string {
  return productName
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
