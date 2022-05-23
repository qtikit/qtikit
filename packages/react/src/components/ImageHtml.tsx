import React, {useContext, useMemo} from 'react';

import {QtiViewerContext} from '../QtiViewer';
import {useResourceRequestAction} from '../utils/action';
import {classNameForComponent} from '../utils/style';
import {resolveUrl} from '../utils/url';

export type ImageHtmlProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageHtml: React.FC<ImageHtmlProps> = ({src, children, ...props}) => {
  const {baseUrl} = useContext(QtiViewerContext);
  const url = useMemo(() => resolveUrl(src, baseUrl), [src, baseUrl]);
  const newUrl = useResourceRequestAction(url);

  return (
    <span className={classNameForComponent('image')}>
      <img {...props} src={newUrl} />
    </span>
  );
};

export default ImageHtml;
