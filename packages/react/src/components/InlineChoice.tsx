import React from 'react';
import {InlineChoiceCharacteristics as InlineChoiceProps} from '@qtikit/model/lib/qti2_2';

import {useInteractionStateContext} from '../interactions/InteractionState';

function flattenChildren(children: React.ReactNode): string {
  return React.Children.map(children, child => child)?.join('') || '';
}

const InlineChoice: React.FC<(InlineChoiceProps & Node[]) | any> = ({identifier, elementChildren}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = ({target: {value}}) => {
    setInteractionState({[identifier]: value});
  };

  console.log('children', elementChildren);

  return (
    <span className={'qtikit-component__select'}>
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
