import React from 'react';
import {SimpleChoiceCharacteristics as SimpleChoiceProps} from '@qtikit/model/src/qti2_2';

import {InteractionResponse, InteractionResponseContext} from '../interactions/InteractionResponseContext';

const SimpleChoice: React.FC<SimpleChoiceProps | any> = props => {
  const {response, setResponse} = React.useContext(InteractionResponseContext);

  const onChange = () => {
    const response: InteractionResponse = {};
    response[props.identifier] = true;
    setResponse(response);
  };

  return (
    <div>
      <input type="radio" checked={response[props.identifier] === true} value={props.identifier} onChange={onChange} />
      <label>{props.children}</label>
    </div>
  );
};

export default SimpleChoice;
