import React, {useMemo} from 'react';

import {QtiView, QtiBody} from './View';
import {QtiViewerProps} from '../types/viewer';

export const ItemBody = ({
  document,
  inputState,
  onChange,
  onFetchStart,
  onFetchEnd,
  options,
  ...props
}: QtiViewerProps) => {
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
    <QtiView
      state={{inputState, onChange}}
      document={document}
      events={{
        onFetchStart,
        onFetchEnd,
      }}
      options={options}
      {...props}>
      <QtiBody name="qtikit-rubricblock" document={document} root={document.itemBody} renderOptions={renderOption} />
    </QtiView>
  );
};
