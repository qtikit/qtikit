import { ensureDir } from "https://deno.land/std@0.113.0/fs/mod.ts";

export type QtiSpecVersion = keyof typeof qtiModelSpecUrls;

export const qtiModelSpecUrls = {
  "2.2.4": (
    "https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html"
  ),
};

export async function fetchModelSpec(version: QtiSpecVersion): Promise<string> {
  const qtiSpecUrl = qtiModelSpecUrls[version];
  return await fetch(qtiSpecUrl).then((res) => res.text());
}

export async function getModelSpec(version: QtiSpecVersion): Promise<string> {
  const specFilePath = `spec/${version}.html`;
  try {
    return await Deno.readTextFile(specFilePath);
  } catch {
    const qtiSpecText = await fetchModelSpec(version);
    await ensureDir("spec");
    await Deno.writeTextFile(specFilePath, qtiSpecText);
    return qtiSpecText;
  }
}
