import React from 'react';
import type {OrderInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {createStyle} from '../../utils/style';
import InteractionStateContext, {useInteractionState} from '../InteractionState';
import {DragDropContextProvider} from '../../components/DragDrop';

const orderInteractionStyle = createStyle({display: 'flex', flexDirection: 'column'});

interface OrderInteractionProps extends OrderInteractionCharacteristics {
  responseIdentifier: string;
}
const OrderInteraction: React.FC<OrderInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const children = React.Children.toArray(props.children).filter(
    child => child && typeof child === 'object'
  ) as React.ReactElement[];
  const simpleChoices = children.filter(child => (child.type as any).displayName === 'SimpleChoice');
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
    <div style={orderInteractionStyle}>
      <InteractionStateContext.Provider
        value={{interactionElementName: 'orderInteraction', interactionState, setInteractionState}}>
        <DragDropContextProvider>{props.children}</DragDropContextProvider>
      </InteractionStateContext.Provider>
    </div>
  );
};

export default OrderInteraction;
