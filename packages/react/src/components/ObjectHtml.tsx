import React, {useContext} from 'react';

import {QtiViewerContext} from '@src/QtiViewer';

type ObjectHtmlProps = React.ObjectHTMLAttributes<HTMLObjectElement>;

const ObjectHtml: React.FC<ObjectHtmlProps> = ({data, ...props}) => {
  const {baseUrl} = useContext(QtiViewerContext);
  return <object data={`${baseUrl}/${data}`} {...props} />;
};

export default ObjectHtml;
