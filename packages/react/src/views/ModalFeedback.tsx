import React, {useMemo} from 'react';

import {QtiView, QtiBody} from './View';
import {QtiViewerProps} from '../types/viewer';

export const ModalFeedback = ({
  document,
  inputState,
  onChange,
  onResolveUrl,
  onFetchStart,
  onFetchEnd,
  options,
  ...props
}: QtiViewerProps) => {
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
    <QtiView
      state={{inputState, onChange}}
      events={{onResolveUrl, onFetchStart, onFetchEnd}}
      document={document}
      options={options}
      {...props}>
      <>
        {identifiers.map(identifier => {
          const modal = document.modalFeedbacks[identifier];
          if (modal) {
            return (
              <QtiBody
                key={identifier}
                name="qtikit-modalfeedback"
                document={document}
                root={modal}
                renderOptions={renderOption}
              />
            );
          }
        })}
      </>
    </QtiView>
  );
};
