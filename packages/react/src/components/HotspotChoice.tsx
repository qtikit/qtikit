import * as React from 'react';
import {Shape, Coords, BaseSequenceXBaseCharacteristics, HotspotChoiceCharacteristics} from '@qtikit/model/lib/qti2_2';

import {Attribute, QtiModelProps} from '../types/props';
import {createStyle, createShapeStyle, classNameForComponent} from '../utils/style';
import {useInteractionStateContext} from '../interactions/InteractionState';

const hotspotChoiceLabelStyle = createStyle(({shape, coords}: {shape: Shape; coords: Attribute<Coords>}) => ({
  ...createShapeStyle(coords)[shape],
}));

export type HotspotChoiceProps = QtiModelProps<BaseSequenceXBaseCharacteristics, HotspotChoiceCharacteristics>;

const HotspotChoice: React.FC<HotspotChoiceProps> = ({identifier, shape, coords, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const checked = !!interactionState[identifier];

  const handleChange = () => {
    setInteractionState({
      [identifier]: true,
    });
  };

  return (
    <span className={classNameForComponent('hotspot-choice')}>
      <label className={checked ? 'checked' : ''} style={hotspotChoiceLabelStyle({shape, coords})}>
        <input type="radio" checked={checked} value={identifier} onChange={handleChange} />
        {children}
      </label>
    </span>
  );
};

export default HotspotChoice;
