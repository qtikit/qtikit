import * as React from 'react';
import {AssociableHotspotCharacteristics as AssociableHotspotProps, Shape, Coords} from '@qtikit/model/lib/qti2_2';

import {createStyle, createShapeStyle} from '../utils/style';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {Current, Droppable} from './DragDrop';

const associableHotspotLabelStyle = createStyle(
  ({shape, coordsPattern}: {shape: Shape; coordsPattern: Coords['pattern']}) => ({
    display: 'inline-flex',
    border: '1px solid rgba(0,0,0,0)',
    boxSizing: 'border-box' as const,
    position: 'absolute' as const,
    cursor: 'pointer',
    ...createShapeStyle(coordsPattern)[shape],
  })
);

const AssociableHotspot: React.FC<AssociableHotspotProps | any> = ({
  identifier,
  shape,
  coords: coordsPattern,
  children,
}) => {
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
    <Droppable style={associableHotspotLabelStyle({shape, coordsPattern})} onDrop={handleDrop}>
      {dropped}
      {children}
    </Droppable>
  );
};

export default AssociableHotspot;
