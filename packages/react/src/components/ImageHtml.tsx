import React, {useContext, useEffect} from 'react';

import {ViewContext} from '../views/View';
import {useFetchEvent} from '../utils/events';
import {classNameForComponent} from '../utils/style';

export type ImageHtmlProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageHtml: React.FC<ImageHtmlProps> = ({src, children, ...props}) => {
  const {
    document: {baseUrl},
  } = useContext(ViewContext);
  const {fetchSrc, fetchStart, fetchEnd} = useFetchEvent('image', src, baseUrl);

  useEffect(() => {
    fetchStart({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <span className={classNameForComponent('image')}>
      <img {...props} src={fetchSrc} onLoad={fetchEnd} />
    </span>
  );
};

export default ImageHtml;
