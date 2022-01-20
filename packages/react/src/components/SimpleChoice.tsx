import React from 'react';
import {BaseSequenceCharacteristics, SimpleChoiceCharacteristics} from '@qtikit/model/lib/qti2_2';

import {QtiModelProps} from '../types/props';
import {classNameForComponent, createStyle} from '../utils/style';
import {useInteractionStateContext} from '../interactions/InteractionState';
import {Current, Draggable, Droppable, useDragDropContext} from './DragDrop';
import {parseBoolean} from '../utils/type';
import {useCorrectResponseContext} from '../interactions/CorrectResponse';

export type SimpleChoiceProps = QtiModelProps<BaseSequenceCharacteristics, SimpleChoiceCharacteristics>;

const DefaultSimpleChoice: React.FC<SimpleChoiceProps> = ({identifier, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();
  const correctResponse = useCorrectResponseContext();

  const datasetAttrs = React.useMemo(() => {
    const dataset = {
      'data-qtikit-checked': interactionState[identifier] === true,
    } as any;

    if (correctResponse) {
      dataset['data-qtikit-correct'] = correctResponse[identifier] ? true : false;
    }

    return dataset;
  }, [correctResponse, identifier, interactionState]);

  const handleChange = () => {
    setInteractionState({
      [identifier]: !interactionState[identifier],
    });
  };

  return (
    <span className={classNameForComponent('simple-choice')} {...datasetAttrs}>
      <label>
        <input
          type="checkbox"
          checked={interactionState[identifier] === true}
          value={identifier}
          onChange={handleChange}
        />
        {children}
      </label>
    </span>
  );
};

const OrderSimpleChoiceStyle = createStyle(({index, isDragging}: {index: number; isDragging: boolean}) => ({
  order: index,
  opacity: isDragging ? 0.01 : 1,
}));

const OrderSimpleChoice: React.FC<SimpleChoiceProps> = ({identifier, fixed, children}) => {
  const {interactionState, setInteractionState} = useInteractionStateContext();
  const {current} = useDragDropContext();

  const draggable = !parseBoolean(fixed);

  const handleDragEnter = draggable
    ? (current: Current) => {
        if (current.name === identifier) return;

        setInteractionState({
          ...interactionState,
          [current.name]: interactionState[identifier],
          [identifier]: interactionState[current.name],
        });
      }
    : undefined;

  return (
    <div
      style={OrderSimpleChoiceStyle({
        index: Number(interactionState[identifier] ?? 0),
        isDragging: current?.name === identifier,
      })}>
      <Draggable
        className={classNameForComponent('order-simple-choice')}
        draggable={draggable}
        current={{value: identifier}}>
        <Droppable onDragEnter={handleDragEnter}>{children}</Droppable>
      </Draggable>
    </div>
  );
};

const SimpleChoice: React.FC<SimpleChoiceProps> = props => {
  const {interactionElementName} = useInteractionStateContext();

  return interactionElementName === 'orderInteraction' ? (
    <OrderSimpleChoice {...props} />
  ) : (
    <DefaultSimpleChoice {...props} />
  );
};

export default SimpleChoice;
