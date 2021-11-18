import * as React from 'react';
import {SimpleChoiceCharacteristics as SimpleChoiceProps} from '@qtikit/model/lib/qti2_2';

import {createStyle} from '../utils/style';
import {useInteractionStateContext} from '../interactions/InteractionState';

const hottextStyle = createStyle({
  fontWeight: 'bold',
  fontStyle: 'italic',
  display: 'inline-flex',
  alignItems: 'center',
});

const hottextInputStyle = createStyle({
  margin: 0,
  marginRight: '0.2em',
});

const Hottext: React.FC<SimpleChoiceProps | any> = ({identifier, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange = () => {
    setInteractionState({
      [identifier]: true,
    });
  };

  return (
    <label style={hottextStyle}>
      <input
        style={hottextInputStyle}
        type="radio"
        checked={interactionState[identifier] === true}
        value={identifier}
        onChange={handleChange}
      />
      {children}&nbsp;
    </label>
  );
};

export default Hottext;
