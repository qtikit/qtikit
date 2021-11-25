import * as React from 'react';
import {HotspotChoiceCharacteristics as HotspotChoiceProps, Shape, Coords} from '@qtikit/model/lib/qti2_2';

import {createStyle, createShapeStyle} from '../utils/style';
import {useInteractionStateContext} from '../interactions/InteractionState';

const hotspotChoiceLabelStyle = createStyle(
  ({shape, coordsPattern, checked}: {shape: Shape; coordsPattern: Coords['pattern']; checked: boolean}) => ({
    position: 'absolute' as const,
    display: 'block',
    cursor: 'pointer',
    ...createShapeStyle(coordsPattern)[shape],
    ...(checked ? {backgroundColor: 'rgba(255, 0, 0, .3)'} : {}),
  })
);

const hotspotChoiceInputStyle = createStyle({
  display: 'none',
});

const HotspotChoice: React.FC<HotspotChoiceProps | any> = ({identifier, shape, coords: coordsPattern, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const checked = !!interactionState[identifier];

  const handleChange = () => {
    setInteractionState({
      [identifier]: true,
    });
  };

  return (
    <label style={hotspotChoiceLabelStyle({shape, coordsPattern, checked})}>
      <input
        style={hotspotChoiceInputStyle}
        type="radio"
        checked={checked}
        value={identifier}
        onChange={handleChange}
      />
      {children}
    </label>
  );
};

export default HotspotChoice;
