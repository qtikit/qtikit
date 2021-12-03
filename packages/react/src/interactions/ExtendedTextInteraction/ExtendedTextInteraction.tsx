import React from 'react';
import {BasePromptInteractionCharacteristics, ExtendedTextInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {CharsToProps} from '../../types/props';
import {classNameForInteraction} from '../../utils/style';
import {getPlaceHolder} from '../../utils/interaction';
import InteractionStateContext, {useInteractionState} from '../InteractionState';
import ExtendedText from '../../components/ExtendedText';

const IDENTIFIER = 'textarea';

type ExtendedTextInteractionProps = CharsToProps<
  BasePromptInteractionCharacteristics,
  ExtendedTextInteractionCharacteristics
>;

const ExtendedTextInteraction: React.FC<ExtendedTextInteractionProps> = ({
  responseIdentifier,
  placeholderText,
  expectedLength,
  expectedLines,
  children,
}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => ({[IDENTIFIER]: userInput[0] ?? ''}),
    decode: interactionState => [interactionState[IDENTIFIER] as string],
  });

  return (
    <div className={classNameForInteraction('extended-text')}>
      {children}
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <ExtendedText
          identifier={IDENTIFIER}
          placeholder={getPlaceHolder({placeholderText, expectedLength, expectedLines})}
        />
      </InteractionStateContext.Provider>
    </div>
  );
};

export default ExtendedTextInteraction;
