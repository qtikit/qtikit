import React from 'react';
import {HotspotInteractionCharacteristics as HotspotInteractionProps} from '@qtikit/model/lib/qti2_2';

import InteractionStateContext, {useInteractionState} from '../InteractionState';
import {className, classNameForInteraction} from '../../utils/style';

const INTERACTION_COMPONENT_NAMES = ['ObjectHtml', 'HotspotChoice'];

const HotspotInteraction: React.FC<HotspotInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => [input, true])),
    decode: interactionState => Object.keys(interactionState),
  });

  const children = React.Children.toArray(props.children).filter(
    child => child && typeof child === 'object'
  ) as React.ReactElement[];
  const interactionComponents = children.filter(child =>
    INTERACTION_COMPONENT_NAMES.includes((child.type as any).displayName)
  );
  const restComponents = children.filter(
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
