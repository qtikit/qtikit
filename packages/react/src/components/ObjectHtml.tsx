import React, {useContext} from 'react';

import {QtiViewerContext} from '../QtiViewer';
import {classNameForComponent} from '../utils/style';

export type ObjectHtmlProps = React.ObjectHTMLAttributes<HTMLObjectElement>;

const ObjectHtml: React.FC<ObjectHtmlProps> = ({data, ...props}) => {
  const {baseUrl} = useContext(QtiViewerContext);
  return (
    <span className={classNameForComponent('object')}>
      <object data={`${baseUrl}/${data}`} {...props} />
    </span>
  );
};

export default ObjectHtml;
