import React, {useContext} from 'react';

import {QtiViewerContext} from '../QtiViewer';
import {classNameForComponent} from '../utils/style';

type ImageHtmlProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageHtml: React.FC<ImageHtmlProps> = ({src, children, ...props}) => {
  const {baseUrl} = useContext(QtiViewerContext);
  return (
    <span className={classNameForComponent('image')}>
      <img src={`${baseUrl}/${src}`} {...props} />
    </span>
  );
};

export default ImageHtml;
