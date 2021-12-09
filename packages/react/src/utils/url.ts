export function getBaseUrl(url: string): string {
  if (!/^(http|https):\/\//.test(url)) {
    throw new Error('Assessment source URL must be absolute path');
  }

  return url.split('/').slice(0, -1).join('/') + '/';
}

export function getPathName(url: string): string {
  return url.split('/').pop() ?? '';
}

export function resolveUrl(pathname: string | undefined, baseurl?: string): string {
  const url = new URL(baseurl || location.href);

  return new URL(pathname || '/', url).href;
}
