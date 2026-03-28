export const normalizeForSearch = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '');

export const tokenizeForSearch = (value: string) =>
  value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
