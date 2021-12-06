import * as React from 'react';
import {
  Shape,
  Coords,
  BaseSequenceXBaseCharacteristics,
  AssociableHotspotCharacteristics,
} from '@qtikit/model/lib/qti2_2';

import {Attribute, QtiModelProps} from '../types/props';
import {createStyle, createShapeStyle, classNameForComponent} from '../utils/style';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {Current, Droppable} from './DragDrop';

const associableHotspotLabelStyle = createStyle(({shape, coords}: {shape: Shape; coords: Attribute<Coords>}) => ({
  ...createShapeStyle(coords)[shape],
}));

export type AssociableHotspotProps = QtiModelProps<BaseSequenceXBaseCharacteristics, AssociableHotspotCharacteristics>;

const AssociableHotspot: React.FC<AssociableHotspotProps> = ({identifier, shape, coords, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();

  const [dropped, setDropped] = React.useState<React.ReactNode>();

  const handleDrop = (current: Current) => {
    setInteractionState({
      ...interactionState,
      [identifier]: current.value,
    });

    setDropped(current.node);
  };

  return (
    <Droppable
      className={classNameForComponent('associable-hotspot')}
      style={associableHotspotLabelStyle({shape, coords})}
      onDrop={handleDrop}>
      {dropped}
      {children}
    </Droppable>
  );
};

export default AssociableHotspot;
