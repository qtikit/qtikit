export function getBaseUrl(url: string): string {
  if (!/^(http|https):\/\//.test(url)) {
    throw new Error('Assessment source URL must be absolute path');
  }

  return url.split('/').slice(0, -1).join('/') + '/';
}

export function getUrl(pathname: string | null, baseurl?: string): string {
  const url = new URL(baseurl || location.href);

  return new URL(pathname || '/', url.origin).href;
}
