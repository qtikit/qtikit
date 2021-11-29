import {responseDeclarationDomToModel} from '@qtikit/model/lib/qti2_2-dom-to-model';

import parseXml from './parseXml';
import fixture1 from './fixture/1';

test('fixture1', () => {
  const document = parseXml(fixture1);
  const responseDeclarationElement = document.getElementsByTagName('responseDeclaration')[0];
  expect(responseDeclarationDomToModel(responseDeclarationElement)).toStrictEqual({
    $children: [['correctResponse', {$children: [['value', {$value: 'foo'}]]}]],
    baseType: 'identifier',
    cardinality: 'single',
    identifier: {$value: 'RESPONSE'},
  });
});
