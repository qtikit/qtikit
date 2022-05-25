import React, {useMemo} from 'react';

import {QtiDocument, QtiBody} from './Document';
import {View} from './View';
import {ViewerEvents, ViewerOptions, ViewerState} from '../types/viewer';

export type ModalFeedbackProps = ViewerState &
  ViewerEvents & {
    document: QtiDocument;
    options?: ViewerOptions;
  };

export const ModalFeedback = ({
  document,
  inputState,
  onChange,
  onFetchStart,
  options,
  ...props
}: ModalFeedbackProps) => {
  if (!document.hasModalFeedback()) {
    throw new Error('Invalid QTI document');
  }

  const identifiers = useMemo(() => options?.showIdentifiers ?? [], [options]);
  const renderOption = useMemo(
    () => ({
      parseLaTex: options?.showLaTex,
    }),
    [options]
  );

  return (
    <View state={{inputState, onChange}} events={{onFetchStart}} document={document} options={options} {...props}>
      <>
        {identifiers.map((identifier, index) => {
          const modal = document.modalFeedbacks[identifier];
          console.log('modal feedback', modal, document.modalFeedbacks);
          if (modal) {
            return <QtiBody key={index} name="qtikit-modalfeedback" root={modal} renderOptions={renderOption} />;
          }
        })}
      </>
    </View>
  );
};
