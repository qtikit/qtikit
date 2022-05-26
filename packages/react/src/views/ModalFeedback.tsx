import React, {useMemo} from 'react';

import {QtiBody} from './Document';
import {View} from './View';
import {ViewerProps} from '../types/viewer';

export const ModalFeedback = ({document, inputState, onChange, onFetchStart, options, ...props}: ViewerProps) => {
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
          if (modal) {
            return <QtiBody key={index} name="qtikit-modalfeedback" root={modal} renderOptions={renderOption} />;
          }
        })}
      </>
    </View>
  );
};
