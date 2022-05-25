import React, {useContext} from 'react';

import {ViewContext} from '../views/View';
import {classNameForComponent} from '../utils/style';
import {useFetchStartEvent} from '../utils/events';

export type ObjectHtmlProps = React.ObjectHTMLAttributes<HTMLObjectElement>;

const ObjectHtml: React.FC<ObjectHtmlProps> = ({data, ...props}) => {
  const {
    document: {baseUrl},
  } = useContext(ViewContext);

  // TODO: check object types not only url
  const url = useFetchStartEvent(data, baseUrl);

  return (
    <span className={classNameForComponent('object')}>
      <object data={url} {...props} />
    </span>
  );
};

export default ObjectHtml;
