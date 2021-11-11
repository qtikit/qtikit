export function getBaseUrl(url: string): string {
  return url.split('/').slice(0, -1).join('/');
}
