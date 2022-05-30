import React, {useMemo} from 'react';

import {QtiBody} from './Document';
import {View} from './View';
import {ViewerProps} from '../types/viewer';

export const RubricBlock = ({document, inputState, onChange, onFetchStart, options, ...props}: ViewerProps) => {
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
    <View state={{inputState, onChange}} events={{onFetchStart}} document={document} options={options} {...props}>
      <>
        {Object.entries(document.rubricBlocks).map(([, rubricBlock], index) => {
          return <QtiBody key={index} name="qtikit-rubricblock" root={rubricBlock} renderOptions={renderOption} />;
        })}
      </>
    </View>
  );
};
