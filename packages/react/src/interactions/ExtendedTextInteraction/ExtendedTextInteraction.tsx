import React from 'react';
import {ExtendedTextInteractionCharacteristics as ExtendedTextInteractionProps} from '@qtikit/model/lib/qti2_2';

import {getPlaceHolder} from '../../utils/interaction';
import {QtiViewerContext} from '../../QtiViewer';
import {InteractionState, InteractionStateEncoder, InteractionStateDecoder} from '../InteractionStateContext';

const IDENTIFIER = 'textarea';

const validate = (value: string) => {
  return value;
};

const textareaBlockStyle = {
  display: 'flex',
};

const textareaStyle = {
  width: '90%',
  marginTop: '1em',
  height: '14em',
};

const encodeResponse: InteractionStateEncoder = userInput => ({[IDENTIFIER]: userInput.join()});
const decodeResponse: InteractionStateDecoder = interactionState => [interactionState[IDENTIFIER] as string];

const ExtendedTextInteraction: React.FC<ExtendedTextInteractionProps | any> = ({responseIdentifier, ...props}) => {
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

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({target: {value}}) => {
    setInteractionState({[IDENTIFIER]: validate(value)});
  };

  return (
    <>
      {props.children}
      <div style={textareaBlockStyle}>
        <textarea
          placeholder={getPlaceHolder(props)}
          style={textareaStyle}
          onChange={handleChange}
          value={interactionState[IDENTIFIER] as string}></textarea>
      </div>
    </>
  );
};

export default ExtendedTextInteraction;
