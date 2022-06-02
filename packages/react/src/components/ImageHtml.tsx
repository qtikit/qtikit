import React, {useContext} from 'react';

import {ViewContext} from '../views/View';
import {classNameForComponent} from '../utils/style';
import {useFetchData} from '../utils/fetch';

export type ImageHtmlProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageHtml: React.FC<ImageHtmlProps> = ({src, children, ...props}) => {
  const {
    document: {baseUrl},
  } = useContext(ViewContext);
  const [retrivedData, onFetchEnd] = useFetchData('image', src ?? '', baseUrl);

  return (
    <span className={classNameForComponent('image')}>
      {retrivedData && <img {...props} src={retrivedData} onError={onFetchEnd} onLoad={onFetchEnd} />}
    </span>
  );
};

export default ImageHtml;
