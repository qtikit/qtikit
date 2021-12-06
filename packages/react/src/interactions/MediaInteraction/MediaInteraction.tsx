import React from 'react';
import {BasePromptInteractionCharacteristics, MediaInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../../types/props';
import {classNameForInteraction} from '../../utils/style';

type MediaInteractionProps = QtiModelProps<BasePromptInteractionCharacteristics, MediaInteractionCharacteristics>;

const MediaInteraction: React.FC<MediaInteractionProps> = ({children}) => {
  return <div className={classNameForInteraction('media')}>{children}</div>;
};

export default MediaInteraction;
