import React, {useMemo} from 'react';

import {QtiView, QtiBody} from './View';
import {QtiViewerProps} from '../types/viewer';

export const RubricBlock = ({
  document,
  inputState,
  onChange,
  onFetchStart,
  onFetchEnd,
  options,
  ...props
}: QtiViewerProps) => {
  if (!document.hasRubricBlock()) {
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
      events={{onFetchStart, onFetchEnd}}
      document={document}
      options={options}
      {...props}>
      <>
        {Object.entries(document.rubricBlocks).map(([, rubricBlock], index) => {
          return (
            <QtiBody
              key={index}
              name="qtikit-rubricblock"
              document={document}
              root={rubricBlock}
              renderOptions={renderOption}
            />
          );
        })}
      </>
    </QtiView>
  );
};
