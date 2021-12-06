import * as React from 'react';
import {BasePromptInteractionCharacteristics, SliderInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../types/props';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {classNameForComponent} from '../utils/style';

export type SliderProps = QtiModelProps<
  Omit<BasePromptInteractionCharacteristics, 'responseIdentifier'>,
  SliderInteractionCharacteristics
> & {
  identifier: string;
};

const Slider: React.FC<SliderProps> = ({identifier, lowerBound, upperBound, step, stepLabel}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => {
    setInteractionState({[identifier]: value});
  };

  return (
    <span className={classNameForComponent('slider')}>
      <input
        type="range"
        id={identifier}
        min={lowerBound}
        max={upperBound}
        step={step}
        onChange={handleChange}
        value={interactionState[identifier] as string}
      />
      {stepLabel && JSON.parse(stepLabel) && <label>{interactionState[identifier]}</label>}
    </span>
  );
};

export default Slider;
