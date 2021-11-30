import React from 'react';
import {GraphicGapMatchInteractionCharacteristics as GraphicGapMatchInteractionProps} from '@qtikit/model/lib/qti2_2';

import {createStyle} from '../../utils/style';
import InteractionStateContext, {useInteractionState} from '../InteractionState';
import {DragDropContextProvider} from '../../components/DragDrop';

const INTERACTION_COMPONENT_NAMES = ['ObjectHtml', 'AssociableHotspot'];
const SEPARATOR = ' ';

const graphicGapMatchInteractionAreaStyle = createStyle({
  position: 'relative',
});

const GraphicGapMatchInteraction: React.FC<GraphicGapMatchInteractionProps | any> = ({
  responseIdentifier,
  ...props
}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => input.split(SEPARATOR).reverse())),
    decode: interactionState => Object.entries(interactionState).map(entry => entry.reverse().join(SEPARATOR)),
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
      <DragDropContextProvider>
        {restComponents}
        <div style={graphicGapMatchInteractionAreaStyle}>{interactionComponents}</div>
      </DragDropContextProvider>
    </InteractionStateContext.Provider>
  );
};

export default GraphicGapMatchInteraction;
