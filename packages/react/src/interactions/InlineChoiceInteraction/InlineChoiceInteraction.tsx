import React from 'react';
import {InlineChoiceInteractionCharacteristics as InlineChoiceInteractionProps} from '@qtikit/model/lib/qti2_2';

import {QtiViewerContext} from '../../QtiViewer';
import {InteractionState, InteractionStateEncoder, InteractionStateDecoder} from '../InteractionStateContext';

const IDENTIFIER = 'select';

const encodeResponse: InteractionStateEncoder = userInput => ({[IDENTIFIER]: userInput[0]});
const decodeResponse: InteractionStateDecoder = interactionState => [interactionState[IDENTIFIER] as string];

const InlineChoiceInteraction: React.FC<InlineChoiceInteractionProps | any> = ({
  responseIdentifier,
  shuffle,
  required,
  ...props
}) => {
  const {inputState, onChange} = React.useContext(QtiViewerContext);

  const [interactionState, setInteractionState] = [
    React.useMemo(() => encodeResponse(inputState[responseIdentifier] ?? []), [inputState, responseIdentifier]),
    React.useCallback(
      (newInteractionState: InteractionState) => {
        onChange({
          ...inputState,
          [responseIdentifier]: decodeResponse(newInteractionState),
        });
      },
      [inputState, onChange, responseIdentifier]
    ),
  ];

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = ({target: {value}}) => {
    setInteractionState({[IDENTIFIER]: value});
  };

  return (
    <select value={interactionState[IDENTIFIER] as string} onChange={handleChange}>
      <option value="">Choose...</option>
      {props.children}
    </select>
  );
};

export default InlineChoiceInteraction;
