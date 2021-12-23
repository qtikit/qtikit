import React, {ReactNode} from 'react';

import {AttributeName} from '../types/props';
import {parseBoolean} from '../utils/type';

function isSortableAttribute(attributeName: AttributeName, first: any, second: any) {
  const firstName = first.type?.displayName;
  const secondName = second.type?.displayName;
  const fixed = parseBoolean(first.props?.fixed);

  return firstName === attributeName && secondName === attributeName && !fixed ? Math.random() - 0.5 : 0;
}

export function shuffleAttributes(attributeName: AttributeName, children: ReactNode): ReactNode {
  return React.Children.toArray(children).sort((first, second) => isSortableAttribute(attributeName, first, second));
}

const useShuffleAttributes = (attributeName: AttributeName, shuffle: boolean, children: ReactNode) => {
  return React.useMemo(
    () => (shuffle ? shuffleAttributes(attributeName, children) : children),
    [attributeName, children, shuffle]
  );
};

export default useShuffleAttributes;
