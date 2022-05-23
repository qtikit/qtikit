import React, {useContext} from 'react';

import {ViewContext} from '../views/View';
import {classNameForComponent} from '../utils/style';
import {resolveBaseUrl} from '../utils/url';

export type ObjectHtmlProps = React.ObjectHTMLAttributes<HTMLObjectElement>;

const ObjectHtml: React.FC<ObjectHtmlProps> = ({data, ...props}) => {
  const {
    document: {baseUrl},
  } = useContext(ViewContext);
  return (
    <span className={classNameForComponent('object')}>
      <object data={resolveBaseUrl(data, baseUrl)} {...props} />
    </span>
  );
};

export default ObjectHtml;
