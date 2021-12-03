import React from 'react';
import {BasePromptInteractionCharacteristics, SliderInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {InteractionProps} from '../../types/props';
import {classNameForInteraction} from '../../utils/style';
import Slider from '../../components/Slider';
import InteractionStateContext, {useInteractionState} from '../InteractionState';

const IDENTIFIER = 'slider';

type SliderInteractionProps = InteractionProps<BasePromptInteractionCharacteristics, SliderInteractionCharacteristics>;

const SliderInteraction: React.FC<SliderInteractionProps> = ({responseIdentifier, children, ...props}) => {
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
