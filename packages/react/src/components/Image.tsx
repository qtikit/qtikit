import React, {useContext} from 'react';

import {QtiViewerContext} from '@src/QtiViewer';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Image: React.FC<ImageProps> = props => {
  const {baseUrl} = useContext(QtiViewerContext);
  return <img src={`${baseUrl}/${props.src}`} alt={props.alt} />;
};

export default Image;
