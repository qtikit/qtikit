export function trimXml(xml: string) {
  return xml.replace(/(?<=>)(\s+)/gm, '');
}
