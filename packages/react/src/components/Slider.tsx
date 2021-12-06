import * as React from 'react';
import {SliderInteractionCharacteristics as SliderProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionStateContext} from '../interactions/InteractionState';
import {classNameForComponent} from '../utils/style';

const Slider: React.FC<SliderProps | any> = ({identifier, lowerBound, upperBound, step, stepLabel}) => {
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
      {JSON.parse(stepLabel) && <label>{interactionState[identifier]}</label>}
    </span>
  );
};

export default Slider;
