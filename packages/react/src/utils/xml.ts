import {QtiElements} from '../views/QtiDocument';

export function trimXml(xml: string) {
  return xml.replace(/\r?\n(?=)(^\s+<)/gm, '<');
}

export function isXml(xml: string): boolean {
  return /^<\?xml/gi.test(xml);
}

export function reduceElement(tagName: string, element: Element, fn: (acc: any, element: any) => any): QtiElements {
  return Array.from(element.getElementsByTagName(tagName)).reduce(fn, {});
}
