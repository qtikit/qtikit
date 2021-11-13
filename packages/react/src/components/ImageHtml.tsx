import React, {useContext} from 'react';

import {QtiViewerContext} from '../QtiViewer';

type ImageHtmlProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageHtml: React.FC<ImageHtmlProps> = ({src, children, ...props}) => {
  const {baseUrl} = useContext(QtiViewerContext);
  return <img src={`${baseUrl}/${src}`} {...props} />;
};

export default ImageHtml;
