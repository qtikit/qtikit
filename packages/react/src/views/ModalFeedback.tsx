import React, {useMemo} from 'react';

import {QtiDocument, QtiBody} from './Document';
import {View} from './View';
import {ViewerOptions, ViewerState} from '../types/viewer';

export type ModalFeedbackProps = ViewerState & {
  document: QtiDocument;
  options?: ViewerOptions & {
    identifiers: string[];
  };
};

export const ModalFeedback = ({
  document,
  inputState,
  onChange,
  onAction,
  onMatch,
  options,
  ...props
}: ModalFeedbackProps) => {
  if (!document.hasModalFeedback()) {
    throw new Error('Invalid QTI document');
  }

  const identifiers = useMemo(() => options?.identifiers ?? [], [options]);

  console.log('identifiers', options, identifiers);

  return (
    <View state={{inputState, onChange, onAction, onMatch}} document={document} options={options} {...props}>
      <>
        {identifiers.map((identifier, index) => {
          const modal = document.modalFeedbacks[identifier];
          console.log('modal feedback', modal, document.modalFeedbacks);
          if (modal) {
            return <QtiBody key={index} name="qtikit-modalfeedback" root={modal} onMatch={onMatch} />;
          }
        })}
      </>
    </View>
  );
};
