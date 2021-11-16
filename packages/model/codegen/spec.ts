import cacheAsFile from "./misc/cacheAsFile.ts";

export type QtiSpecVersion = keyof typeof qtiModelSpecUrls;

export const qtiModelSpecUrls = {
  "2.2.4":
    "https://www.imsglobal.org/question/qtiv2p2p4/QTIv2p2p4-ASI-InformationModelv1p0/imsqtiv2p2p4_asi_v1p0_InfoModelv1p0.html",
};

export async function fetchModelSpec(version: QtiSpecVersion): Promise<string> {
  const qtiSpecUrl = qtiModelSpecUrls[version];
  return await fetch(qtiSpecUrl).then((res) => res.text());
}

const id = <T>(x: T): T => x;
export async function getModelSpec(version: QtiSpecVersion): Promise<string> {
  return await cacheAsFile(
    `spec/${version}.html`,
    () => fetchModelSpec(version),
    id,
    id,
  );
}
