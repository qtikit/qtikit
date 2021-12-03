import React from 'react';
import {BasePromptInteractionCharacteristics, HotspotInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {CharsToProps} from '../../types/props';
import {className, classNameForInteraction} from '../../utils/style';
import InteractionStateContext, {useInteractionState} from '../InteractionState';

const INTERACTION_COMPONENT_NAMES = ['ObjectHtml', 'HotspotChoice'];

type HotspotInteractionProps = CharsToProps<BasePromptInteractionCharacteristics, HotspotInteractionCharacteristics>;

const HotspotInteraction: React.FC<HotspotInteractionProps> = ({responseIdentifier, children}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => [input, true])),
    decode: interactionState => Object.keys(interactionState),
  });

  const componentChildren = React.Children.toArray(children).filter(
    child => child && typeof child === 'object'
  ) as React.ReactElement[];
  const interactionComponents = componentChildren.filter(child =>
    INTERACTION_COMPONENT_NAMES.includes((child.type as any).displayName)
  );
  const restComponents = componentChildren.filter(
    child => !INTERACTION_COMPONENT_NAMES.includes((child.type as any).displayName)
  );

  return (
    <div className={classNameForInteraction('hotspot')}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        {restComponents}
        <div className={className('interaction', 'hotspot__components')}>{interactionComponents}</div>
      </InteractionStateContext.Provider>
    </div>
  );
};

export default HotspotInteraction;
