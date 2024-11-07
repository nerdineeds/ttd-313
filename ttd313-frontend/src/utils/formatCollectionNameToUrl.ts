export function formatCollectionNameToUrl(collectionName) {
  // Ensure collectionName is a valid string
  if (typeof collectionName !== 'string') {
    console.error('Invalid collectionName:', collectionName);
    return '';
  }

  return collectionName
    .toLowerCase() // Convert to lowercase
    .replace(/&/g, 'and') // Replace '&' with 'and'
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .trim() // Remove any leading or trailing whitespace
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

// Example usage:
const formattedUrl = formatCollectionNameToUrl(
  'Live Psilocybin & More'
);
console.log(formattedUrl); // Output: 'live-psilocybin-and-more'
