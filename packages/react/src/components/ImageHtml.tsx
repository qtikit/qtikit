import React, {useContext} from 'react';

import {QtiViewerContext} from '../QtiViewer';
import {classNameForComponent} from '../utils/style';

export type ImageHtmlProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageHtml: React.FC<ImageHtmlProps> = ({src, children, ...props}) => {
  const {baseUrl} = useContext(QtiViewerContext);
  return (
    <span className={classNameForComponent('image')}>
      <img {...props} src={`${baseUrl}/${src}`} />
    </span>
  );
};

export default ImageHtml;
