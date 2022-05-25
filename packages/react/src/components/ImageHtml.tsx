import React, {useContext} from 'react';

import {ViewContext} from '../views/View';
import {useFetchStartEvent} from '../utils/events';
import {classNameForComponent} from '../utils/style';

export type ImageHtmlProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageHtml: React.FC<ImageHtmlProps> = ({src, children, ...props}) => {
  const {
    document: {baseUrl},
  } = useContext(ViewContext);
  const url = useFetchStartEvent(src, baseUrl);

  return (
    <span className={classNameForComponent('image')}>
      <img {...props} src={url} />
    </span>
  );
};

export default ImageHtml;
