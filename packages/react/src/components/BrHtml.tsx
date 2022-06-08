import React from 'react';

import {classNameForComponent} from '../utils/style';

export type BeHtmlProps = React.HTMLAttributes<HTMLBRElement>;

const BrHtml: React.FC<BeHtmlProps> = () => {
  return (
    <span className={classNameForComponent('br')} dangerouslySetInnerHTML={{ __html: '<br/>' }}></span>
  );
};

export default BrHtml;
