import React from 'react';
import {OrderInteractionCharacteristics} from '@qtikit/model/lib/qti2_2';

import {classNameForCharacteristic} from '../utils/style';

const OrientationCharacteristic: React.FC<Pick<OrderInteractionCharacteristics, 'orientation'>> = ({
  orientation,
  children,
}) => <div className={`${classNameForCharacteristic('orientation', orientation ?? 'vertical')}`}>{children}</div>;

export default OrientationCharacteristic;
