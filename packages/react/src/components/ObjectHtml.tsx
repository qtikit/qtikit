import React, {useContext} from 'react';

import {QtiViewerContext} from '../QtiViewer';
import {classNameForComponent} from '../utils/style';
import {resolveUrl} from '../utils/url';

export type ObjectHtmlProps = React.ObjectHTMLAttributes<HTMLObjectElement>;

const ObjectHtml: React.FC<ObjectHtmlProps> = ({data, ...props}) => {
  const {resourceBaseUrl} = useContext(QtiViewerContext);
  return (
    <span className={classNameForComponent('object')}>
      <object data={resolveUrl(data, resourceBaseUrl)} {...props} />
    </span>
  );
};

export default ObjectHtml;
