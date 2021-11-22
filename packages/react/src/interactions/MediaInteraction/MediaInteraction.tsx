import React from 'react';
import {MediaInteractionCharacteristics as MediaInteractionProps} from '@qtikit/model/lib/qti2_2';

const MediaInteraction: React.FC<MediaInteractionProps | any> = props => {
  return <>{props.children}</>;
};

export default MediaInteraction;
