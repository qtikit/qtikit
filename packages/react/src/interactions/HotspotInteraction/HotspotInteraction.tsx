import React from 'react';
import {HotspotInteractionCharacteristics as HotspotInteractionProps} from '@qtikit/model/lib/qti2_2';

import {createStyle} from '../../utils/style';
import InteractionStateContext, {useInteractionState} from '../InteractionState';

const INTERACTION_COMPONENT_NAMES = ['ObjectHtml', 'HotspotChoice'];

const hospotInteractionAreaStyle = createStyle({
  position: 'relative',
});

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
    <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
      {restComponents}
      <div style={hospotInteractionAreaStyle}>{interactionComponents}</div>
    </InteractionStateContext.Provider>
  );
};

export default HotspotInteraction;
