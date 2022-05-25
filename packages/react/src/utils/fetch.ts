export async function fetchText(src: string): Promise<string> {
  return await fetch(src).then(response => response.text());
}
