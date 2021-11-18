import React from 'react';
import {InlineChoiceCharacteristics as InlineChoiceProps} from '@qtikit/model/lib/qti2_2';

function flattenChildren(children: React.ReactNode): string {
  return React.Children.map(children, child => child)?.join('') || '';
}

const InlineChoice: React.FC<InlineChoiceProps | any> = ({identifier, children}) => {
  return <option value={identifier} dangerouslySetInnerHTML={{__html: flattenChildren(children)}}></option>;
};

export default InlineChoice;
