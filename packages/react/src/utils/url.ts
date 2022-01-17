export function getBaseUrl(url: string): string {
  if (!isUrlString(url)) {
    throw new Error(`Assessment source URL must be absolute path. ${url}`);
  }

  return url.split('/').slice(0, -1).join('/') + '/';
}

export function getPathName(url: string): string {
  return (url && url.split('/').pop()) ?? '';
}

export function resolveUrl(pathname: string | undefined, baseurl?: string): string {
  const url = new URL(baseurl || location.href);

  return new URL(pathname || '/', url).href;
}

export function isUrlString(url: string): boolean {
  return /^(http|https):\/\//.test(url);
}
