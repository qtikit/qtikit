import React, {useContext} from 'react';

import {QtiViewerContext} from '../QtiViewer';
import {classNameForComponent} from '../utils/style';
import {resolveUrl} from '../utils/url';

type ImageHtmlProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageHtml: React.FC<ImageHtmlProps> = ({src, children, ...props}) => {
  const {baseUrl} = useContext(QtiViewerContext);
  return (
    <span className={classNameForComponent('image')}>
      <img src={resolveUrl(src, baseUrl)} {...props} />
    </span>
  );
};

export default ImageHtml;
