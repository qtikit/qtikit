import React from 'react';

import {QtiDocument, QtiBody} from './Document';
import {View} from './View';
import {ViewerOptions, ViewerState} from '../types/viewer';

export type ItemBodyProps = ViewerState & {
  document: QtiDocument;
  options?: ViewerOptions;
};

export const ItemBody = ({document, inputState, onChange, onAction, options, ...props}: ItemBodyProps) => {
  if (!document.hasItemBody()) {
    throw new Error('Invalid QTI document');
  }

  return (
    <View state={{inputState, onChange, onAction}} document={document} options={options} {...props}>
      <QtiBody name="qtikit-itembody" root={document.itemBody} options={{parseLaTex: options?.showLaTex}} />
    </View>
  );
};
