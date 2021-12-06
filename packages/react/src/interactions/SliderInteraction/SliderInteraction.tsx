import React from 'react';
import {SliderInteractionCharacteristics as SliderInteractionProps} from '@qtikit/model/lib/qti2_2';

import InteractionStateContext, {useInteractionState} from '../InteractionState';
import Slider from '../../components/Slider';
import {classNameForInteraction} from '../../utils/style';

const IDENTIFIER = 'slider';

const SliderInteraction: React.FC<SliderInteractionProps | any> = ({responseIdentifier, children, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => ({[IDENTIFIER]: userInput[0] ?? ''}),
    decode: interactionState => [interactionState[IDENTIFIER] as string],
  });

  return (
    <div className={classNameForInteraction('slider')}>
      {children}
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <Slider identifier={IDENTIFIER} {...props} />
      </InteractionStateContext.Provider>
    </div>
  );
};

export default SliderInteraction;
