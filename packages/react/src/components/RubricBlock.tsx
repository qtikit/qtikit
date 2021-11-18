import * as React from 'react';
import {RubricBlockCharacteristics as RubricBlockProps} from '@qtikit/model/lib/qti2_2';

import {createStyle} from '../utils/style';

type View = 'candidate' | 'scorer';

const rubricBlockStyle = createStyle((view: View) => ({
  margin: '2em auto',
  padding: '1em 1em 2em 1em',
  border: 'solid 1px #EEE',
  backgroundColor: {candidate: 'ivory', scorer: '#fcedf3'}[view] ?? 'initial',
  position: 'relative' as const,
}));

const rubricBlockViewStyle = createStyle({
  color: '#999',
  fontStyle: 'italic',
  position: 'absolute',
  top: '-1.2em',
});

const RubricBlock: React.FC<RubricBlockProps | any> = props => {
  return (
    <div style={rubricBlockStyle(props.view)}>
      <span style={rubricBlockViewStyle}>{props.view}:</span>
      {props.children}
    </div>
  );
};

export default RubricBlock;
