import React from 'react';
import {GapMatchInteractionCharacteristics as GapMatchInteractionProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionResponseContext} from '../InteractionResponseContext';
import {DragDropContextProvider} from '../../components/DragDrop';

const GapMatchInteraction: React.FC<GapMatchInteractionProps | any> = props => {
  const {response} = useInteractionResponseContext();

  React.useEffect(() => {
    console.log('response', response);
  }, [response]);

  return (
    <DragDropContextProvider>
      <h3>GapMatch Interaction</h3>
      {props.children}
    </DragDropContextProvider>
  );
};

export default GapMatchInteraction;
