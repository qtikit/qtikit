import React from 'react';
import type {BasePromptInteractionCharacteristics, OrderInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {classNameForInteraction} from '../../utils/style';
import {QtiModelProps} from '../../types/props';
import {DragDropContextProvider} from '../../components/DragDrop';
import InteractionStateContext, {useInteractionState} from '../InteractionState';

type OrderInteractionProps = QtiModelProps<BasePromptInteractionCharacteristics, OrderInteractionCharacteristics>;

const OrderInteraction: React.FC<OrderInteractionProps> = ({responseIdentifier, children}) => {
  const componentChildren = React.Children.toArray(children).filter(
    child => child && typeof child === 'object'
  ) as React.ReactElement[];
  const simpleChoices = componentChildren.filter(child => (child.type as any).displayName === 'SimpleChoice');
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map((input, index) => [input, index])),
    decode: interactionState =>
      Object.entries(interactionState)
        .sort(([, a], [, b]) => Number(a) - Number(b))
        .map(([identifier]) => identifier),
    init: () => Object.fromEntries(simpleChoices.map((child, index) => [child.props.identifier, index])),
  });

  return (
    <div className={classNameForInteraction('order')}>
      <InteractionStateContext.Provider
        value={{interactionElementName: 'orderInteraction', interactionState, setInteractionState}}>
        <DragDropContextProvider>{children}</DragDropContextProvider>
      </InteractionStateContext.Provider>
    </div>
  );
};

export default OrderInteraction;
