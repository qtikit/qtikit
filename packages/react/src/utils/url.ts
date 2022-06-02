export function getBaseUrl(url: string): string {
  return url.split('/').slice(0, -1).join('/') + '/';
}

export function isHttpUrl(url: string): boolean {
  return /^(http|https):\/\//.test(url);
}

export function isBlobUrl(url: string): boolean {
  return /^blob:/.test(url);
}

export function getPathName(url: string): string {
  return (url && url.split('/').pop()) ?? '';
}

export function resolveUrl(pathname: string | undefined, baseurl?: string): string {
  const url = new URL(baseurl || location.href);

  return new URL(pathname || '/', url).href;
}
