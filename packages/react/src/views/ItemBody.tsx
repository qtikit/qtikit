import React, {useMemo} from 'react';

import {QtiBody} from './Document';
import {View} from './View';
import {ViewerProps} from '../types/viewer';

export const ItemBody = ({document, inputState, onChange, onFetchStart, options, ...props}: ViewerProps) => {
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
