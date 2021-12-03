import React from 'react';
import {BaseSequenceFullCharacteristics, GraphicGapMatchInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {CharsToProps} from '../../types/props';
import {classNameForComponent, classNameForInteraction} from '../../utils/style';
import {DragDropContextProvider} from '../../components/DragDrop';
import InteractionStateContext, {useInteractionState} from '../InteractionState';

const INTERACTION_COMPONENT_NAMES = ['ObjectHtml', 'AssociableHotspot'];
const SEPARATOR = ' ';

type GraphicGapMatchInteractionProps = CharsToProps<
  BaseSequenceFullCharacteristics,
  GraphicGapMatchInteractionCharacteristics
>;

const GraphicGapMatchInteraction: React.FC<GraphicGapMatchInteractionProps> = ({responseIdentifier, children}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map(input => input.split(SEPARATOR).reverse())),
    decode: interactionState => Object.entries(interactionState).map(entry => entry.reverse().join(SEPARATOR)),
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
    <div className={classNameForInteraction('graphic-gap-match')}>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <DragDropContextProvider>
          {restComponents}
          <div className={classNameForComponent('graphic-gap-match')}>{interactionComponents}</div>
        </DragDropContextProvider>
      </InteractionStateContext.Provider>
    </div>
  );
};

export default GraphicGapMatchInteraction;
