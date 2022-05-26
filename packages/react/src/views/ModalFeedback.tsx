import React, {useMemo} from 'react';

import {QtiView, QtiBody} from './View';
import {QtiViewerProps} from '../types/viewer';

export const ModalFeedback = ({document, inputState, onChange, onFetchStart, options, ...props}: QtiViewerProps) => {
  if (!document.hasModalFeedback()) {
    throw new Error('Invalid QTI document');
  }

  const identifiers = useMemo(() => options?.identifiers ?? [], [options]);

  console.log('identifiers', options, identifiers);

  return (
    <QtiView state={{inputState, onChange}} events={{onFetchStart}} document={document} options={options} {...props}>
      <>
        {identifiers.map(identifier => {
          const modal = document.modalFeedbacks[identifier];
          if (modal) {
            return (
              <QtiBody name="qtikit-modalfeedback" document={document} root={modal} renderOptions={renderOption} />
            );
          }
        })}
      </>
    </QtiView>
  );
};
