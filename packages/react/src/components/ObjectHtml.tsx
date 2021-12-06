import React, {useContext} from 'react';

import {QtiViewerContext} from '../QtiViewer';

type ObjectHtmlProps = React.ObjectHTMLAttributes<HTMLObjectElement>;

const ObjectHtml: React.FC<ObjectHtmlProps> = ({data, ...props}) => {
  const {baseUrl} = useContext(QtiViewerContext);
  return (
    <span className={'qtikit-component__object'}>
      <object data={`${baseUrl}/${data}`} {...props} />
    </span>
  );
};

export default ObjectHtml;
