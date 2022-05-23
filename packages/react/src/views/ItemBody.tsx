import React, {useMemo} from 'react';

<<<<<<< HEAD
import {QtiView, QtiBody} from './View';
import {QtiViewerProps} from '../types/viewer';

<<<<<<< HEAD
export const ItemBody = ({document, inputState, onChange, onFetchStart, options, ...props}: QtiViewerProps) => {
=======
import {QtiDocument, QtiBody} from './Document';
import {View} from './View';
import {ViewerEvents, ViewerOptions, ViewerState} from '../types/viewer';

export type ItemBodyProps = ViewerState &
  ViewerEvents & {
    document: QtiDocument;
    options?: ViewerOptions;
  };

export const ItemBody = ({document, inputState, onChange, onFetchStart, options, ...props}: ItemBodyProps) => {
>>>>>>> 2fe997a (feat: use fetch events)
=======
export const ItemBody = ({
  document,
  inputState,
  onChange,
  onFetchStart,
  onFetchEnd,
  options,
  ...props
}: QtiViewerProps) => {
>>>>>>> d9c9193 (feat: add fetch events)
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
<<<<<<< HEAD
<<<<<<< HEAD
    <QtiView state={{inputState, onChange}} document={document} events={{onFetchStart}} options={options} {...props}>
=======
    <QtiView
      state={{inputState, onChange}}
      document={document}
      events={{
        onFetchStart,
        onFetchEnd,
      }}
      options={options}
      {...props}>
>>>>>>> d9c9193 (feat: add fetch events)
      <QtiBody name="qtikit-rubricblock" document={document} root={document.itemBody} renderOptions={renderOption} />
    </QtiView>
=======
    <View state={{inputState, onChange}} document={document} events={{onFetchStart}} options={options} {...props}>
      <QtiBody name="qtikit-itembody" root={document.itemBody} renderOptions={renderOption} />
    </View>
>>>>>>> 2fe997a (feat: use fetch events)
  );
};
