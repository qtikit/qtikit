import React, {ReactNode} from 'react';

import {divideComponent} from '../utils/component';
import {parseBoolean} from '../utils/type';

function isSortableAttribute(first: any) {
  const fixed = parseBoolean(first.props?.fixed);

  return !fixed ? Math.random() - 0.5 : 0;
}

export function shuffleAttributes(children: ReactNode): ReactNode {
  return React.Children.toArray(children).sort(first => isSortableAttribute(first));
}

const useShuffleAttributes = (shuffle: boolean, children: ReactNode) =>
  React.useMemo(() => {
    const {component, rest} = divideComponent('Prompt', children);

    return {
      prompt: component[0],
      shuffledChildren: shuffle ? shuffleAttributes(rest) : rest,
    };
  }, [children, shuffle]);

export default useShuffleAttributes;
