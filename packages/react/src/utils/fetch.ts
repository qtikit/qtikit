export async function fetchText(src: string): Promise<string> {
  if (!isSupportedUri(src)) {
    throw new Error(`Unsupported URI: ${src}`);
  }

  return await fetch(src).then(response => response.text());
}
