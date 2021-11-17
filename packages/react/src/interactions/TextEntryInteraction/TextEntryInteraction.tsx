import React from 'react';
import {TextEntryInteractionCharacteristics as TextEntryInteractionProps} from '@qtikit/model/lib/qti2_2';

import {getPlaceHolder} from '../../utils/interaction';
import {QtiViewerContext} from '../../QtiViewer';
import {InteractionState, InteractionStateEncoder, InteractionStateDecoder} from '../InteractionStateContext';

const IDENTIFIER = 'text';

const encodeResponse: InteractionStateEncoder = userInput => ({[IDENTIFIER]: userInput.join()});
const decodeResponse: InteractionStateDecoder = interactionState => [interactionState[IDENTIFIER] as string];

const textStyle = {
  fontSize: '1em',
  border: 'solid 1px',
  width: '6ex',
};

const TextEntryInteraction: React.FC<TextEntryInteractionProps | any> = ({responseIdentifier, ...props}) => {
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => {
    setInteractionState({[IDENTIFIER]: value});
  };

  return (
    <span>
      <input
        type="text"
        style={textStyle}
        placeholder={getPlaceHolder(props)}
        value={interactionState.text as string}
        onChange={handleChange}
      />
      {props.children}
    </span>
  );
};

export default TextEntryInteraction;
