import React from 'react';
import {SliderInteractionCharacteristics as SliderInteractionProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionState} from '../InteractionState';

const IDENTIFIER = 'slider';

const SliderInteraction: React.FC<SliderInteractionProps | any> = ({
  responseIdentifier,
  lowerBound,
  upperBound,
  step,
  stepLabel,
  children,
}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => ({[IDENTIFIER]: userInput[0] ?? ''}),
    decode: interactionState => [interactionState[IDENTIFIER] as string],
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => {
    setInteractionState({[IDENTIFIER]: value});
  };

  return (
    <>
      {children}
      <input
        type="range"
        id={responseIdentifier}
        min={lowerBound}
        max={upperBound}
        step={step}
        onChange={handleChange}
        value={interactionState[IDENTIFIER] as string}
      />
      {JSON.parse(stepLabel) && <label>{interactionState[IDENTIFIER]}</label>}
    </>
  );
};

export default SliderInteraction;
