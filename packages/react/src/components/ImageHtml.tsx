import React, {useContext, useMemo} from 'react';

import {ViewContext} from '../views/View';
import {useResourceRequestAction} from '../utils/action';
import {classNameForComponent} from '../utils/style';
import {resolveBaseUrl} from '../utils/url';

export type ImageHtmlProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageHtml: React.FC<ImageHtmlProps> = ({src, children, ...props}) => {
  const {
    document: {baseUrl},
  } = useContext(ViewContext);
  const url = useMemo(() => resolveBaseUrl(src, baseUrl), [src, baseUrl]);
  const newUrl = useResourceRequestAction(url);

  return (
    <span className={classNameForComponent('image')}>
      <img {...props} src={newUrl} />
    </span>
  );
};

export default ImageHtml;
