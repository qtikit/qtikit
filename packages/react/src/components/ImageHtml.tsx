import React, {useContext} from 'react';

import {QtiViewerContext} from '../QtiViewer';
import {classNameForComponent} from '../utils/style';
import {resolveUrl} from '../utils/url';

export type ImageHtmlProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageHtml: React.FC<ImageHtmlProps> = ({src, children, ...props}) => {
  const {resourceBaseUrl} = useContext(QtiViewerContext);
  return (
    <span className={classNameForComponent('image')}>
      <img {...props} src={resolveUrl(src, resourceBaseUrl)} />
    </span>
  );
};

export default ImageHtml;
