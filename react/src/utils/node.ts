import { Props } from '@src/types/component';

export function getPropsByElement(element: Element): Props {
  return Array.from(element.attributes).reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});
}
