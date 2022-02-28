export function trimXml(xml: string) {
  return xml.replace(/\n(?=)(^\s+<)/gm, '<');
}

export function reduceElement(tagName: string, element: Element, fn: (acc: any, element: any) => any): any {
  return Array.from(element.getElementsByTagName(tagName)).reduce(fn, {});
}

export function readCorrectResponse(root: Document) {
  return reduceElement('responseDeclaration', root.documentElement, (correct, response) => {
    const identifier = response.getAttribute('identifier');
    correct[identifier] = reduceElement('value', response, (values, value) => {
      values[value.textContent] = true;
      return values;
    });

    return correct;
  });
}
