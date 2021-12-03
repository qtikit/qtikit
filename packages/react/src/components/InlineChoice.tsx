import React from 'react';
import {BaseSequenceCharacteristics, InlineChoiceCharacteristics} from '@qtikit/model/lib/qti2_2';

import {CharsToProps} from '../types/props';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {classNameForComponent} from '../utils/style';

function flattenChildren(children: React.ReactNode): string {
  return React.Children.map(children, child => child)?.join('') || '';
}

type InlineChoiceProps = CharsToProps<BaseSequenceCharacteristics, InlineChoiceCharacteristics>;

const InlineChoice: React.FC<InlineChoiceProps> = ({identifier, elementChildren}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = ({target: {value}}) => {
    setInteractionState({[identifier]: value});
  };

  return (
    <span className={classNameForComponent('select')}>
      <select value={interactionState[identifier] as string} onChange={handleChange}>
        <option value="">Choose...</option>
        {[...elementChildren.querySelectorAll('inlineChoice')].map((child: any, i) => (
          <option
            key={i}
            value={child.getAttribute('identifier')}
            dangerouslySetInnerHTML={{__html: flattenChildren(child.innerHTML)}}></option>
        ))}
      </select>
    </span>
  );
};

export default InlineChoice;
