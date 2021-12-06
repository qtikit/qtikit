import * as React from 'react';
import {HotspotChoiceCharacteristics as HotspotChoiceProps, Shape, Coords} from '@qtikit/model/lib/qti2_2';

import {createStyle, createShapeStyle} from '../utils/style';
import {useInteractionStateContext} from '../interactions/InteractionState';

const hotspotChoiceLabelStyle = createStyle(
  ({shape, coordsPattern}: {shape: Shape; coordsPattern: Coords['pattern']}) => ({
    ...createShapeStyle(coordsPattern)[shape],
  })
);

const HotspotChoice: React.FC<HotspotChoiceProps | any> = ({identifier, shape, coords: coordsPattern, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const checked = !!interactionState[identifier];

  const handleChange = () => {
    setInteractionState({
      [identifier]: true,
    });
  };

  return (
    <span className={'qtikit-component__hotspot-choice'}>
      <label className={checked ? 'checked' : ''} style={hotspotChoiceLabelStyle({shape, coordsPattern})}>
        <input type="radio" checked={checked} value={identifier} onChange={handleChange} />
        {children}
      </label>
    </span>
  );
};

export default HotspotChoice;
