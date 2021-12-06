import React from 'react';
import {BaseSequenceXBaseCharacteristics, HotTextCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../types/props';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {classNameForComponent} from '../utils/style';

export type HottextProps = QtiModelProps<BaseSequenceXBaseCharacteristics, HotTextCharacteristics>;

const Hottext: React.FC<HottextProps> = ({identifier, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange = () => {
    setInteractionState({
      [identifier]: true,
    });
  };

  return (
    <span className={classNameForComponent('hottext')}>
      <label>
        <input
          type="radio"
          checked={interactionState[identifier] === true}
          value={identifier}
          onChange={handleChange}
        />
        {children}&nbsp;
      </label>
    </span>
  );
};

export default Hottext;
