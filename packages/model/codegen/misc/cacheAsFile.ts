import { ensureFile } from "https://deno.land/std@0.113.0/fs/mod.ts";

export default async function cacheAsFile<T>(
  path: string,
  calc: () => T | Promise<T>,
  encode: (value: T) => string,
  decode: (text: string) => T,
): Promise<T> {
  try {
    return decode(await Deno.readTextFile(path));
  } catch {
    const value = await calc();
    await ensureFile(path);
    await Deno.writeTextFile(path, encode(value));
    return value;
  }
}
