import React from 'react';
import {OrderInteractionCharacteristics as OrderInteractionProps} from '@qtikit/model/lib/qti2_2';

import {createStyle} from '../../utils/style';
import InteractionStateContext, {useInteractionState} from '../InteractionState';
import {DragDropContextProvider} from '../../components/DragDrop';

const orderInteractionStyle = createStyle({display: 'flex', flexDirection: 'column'});

const OrderInteraction: React.FC<OrderInteractionProps | any> = ({responseIdentifier, ...props}) => {
  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput =>
      userInput.reduce((interactionState, indentifier, index) => ({...interactionState, [indentifier]: index}), {}),
    decode: interactionState =>
      Object.entries(interactionState)
        .sort(([, a], [, b]) => Number(a) - Number(b))
        .map(([identifier]) => identifier),
    init: () =>
      props.children
        .filter(child => child.type.displayName === 'SimpleChoice')
        .reduce(
          (state, child, index) => ({
            ...state,
            [child.props.identifier]: index,
          }),
          {}
        ),
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
