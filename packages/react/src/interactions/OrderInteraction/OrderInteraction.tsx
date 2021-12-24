import React from 'react';
import type {BasePromptInteractionCharacteristics, OrderInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {classNameForInteraction} from '../../utils/style';
import {QtiModelProps} from '../../types/props';
import {DragDropContextProvider} from '../../components/DragDrop';
import InteractionStateContext, {useInteractionState} from '../InteractionState';
import useShuffleAttributes from '../../characteristics/Shuffle';
import {parseBoolean} from '../../utils/type';
import OrientationCharacteristic from '../../characteristics/Orientation';

export type OrderInteractionProps = QtiModelProps<
  BasePromptInteractionCharacteristics,
  OrderInteractionCharacteristics
>;

const OrderInteraction: React.FC<OrderInteractionProps> = ({responseIdentifier, shuffle, orientation, children}) => {
  const {prompt, shuffledChildren} = useShuffleAttributes(parseBoolean(shuffle), children);

  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput => Object.fromEntries(userInput.map((input, index) => [input, index])),
    decode: interactionState =>
      Object.entries(interactionState)
        .sort(([, a], [, b]) => Number(a) - Number(b))
        .map(([identifier]) => identifier),
    init: () =>
      Object.fromEntries(
        React.Children.toArray(shuffledChildren).map((child, index) => [(child as any).props.identifier, index])
      ),
  });

  return (
    <div className={`${classNameForInteraction('order')}`}>
      {prompt}

      <InteractionStateContext.Provider
        value={{interactionElementName: 'orderInteraction', interactionState, setInteractionState}}>
        <DragDropContextProvider>
          <OrientationCharacteristic orientation={orientation}>{shuffledChildren}</OrientationCharacteristic>
        </DragDropContextProvider>
      </InteractionStateContext.Provider>
    </div>
  );
};

export default OrderInteraction;
