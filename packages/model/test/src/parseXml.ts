import {DOMParser} from '@xmldom/xmldom';

export default function parseXml(xml: string): Document {
  return new DOMParser().parseFromString(xml, 'application/xml');
}
