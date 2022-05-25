import React, {useMemo} from 'react';

import {QtiDocument, QtiBody} from './Document';
import {View} from './View';
import {ViewerEvents, ViewerOptions, ViewerState} from '../types/viewer';

export type ItemBodyProps = ViewerState &
  ViewerEvents & {
    document: QtiDocument;
    options?: ViewerOptions;
  };

export const ItemBody = ({document, inputState, onChange, onFetchStart, options, ...props}: ItemBodyProps) => {
  if (!document.hasItemBody()) {
    throw new Error('Invalid QTI document');
  }

  const renderOption = useMemo(
    () => ({
      parseLaTex: options?.showLaTex,
    }),
    [options]
  );

  return (
    <View state={{inputState, onChange}} document={document} events={{onFetchStart}} options={options} {...props}>
      <QtiBody name="qtikit-itembody" root={document.itemBody} renderOptions={renderOption} />
    </View>
  );
};
