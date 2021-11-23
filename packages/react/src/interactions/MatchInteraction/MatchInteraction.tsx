import React from 'react';
import {MatchInteractionCharacteristics as MatchInteractionProps} from '@qtikit/model/lib/qti2_2';

import Prompt from '../../components/Prompt';
import {createStyle} from '../../utils/style';
import CheckBox from '../../components/Checkbox';
import InteractionStateContext, {InteractionState, useInteractionState} from '../InteractionState';
import MatchSet from './MatchSet';

const tableStyle = createStyle({
  tableLayout: 'fixed',
  width: '100%',
  borderCollapse: 'collapse',
  border: '3px solid black',
});

const cellStyle = createStyle({
  border: '1px solid #444444',
});

interface MatchTableProps {
  set: MatchSet;
}

const MatchTable: React.FC<MatchTableProps> = ({set}) => (
  <table style={tableStyle}>
    <tbody>
      <tr>
        <th></th>
        {set.cols().map(({textContent}, index) => (
          <td style={cellStyle} key={`qti-component-match-header-${index}`}>
            {textContent}
          </td>
        ))}
      </tr>
      {set.rows().map(({identifier: row, textContent}, rowIndex) => (
        <tr key={`qti-component-match-row-${rowIndex}`}>
          <th style={cellStyle}>{textContent}</th>
          {set.cols().map(({identifier: col}, colIndex) => (
            <td style={cellStyle} key={`qti-component-match-col-${rowIndex}-${colIndex}`}>
              <CheckBox indentifier={`${row} ${col}`} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const MatchInteraction: React.FC<MatchInteractionProps | any> = ({
  responseIdentifier,
  maxAssociations,
  elementChildren,
}) => {
  const matchSet = React.useMemo(() => new MatchSet(maxAssociations, elementChildren), []);

  const [interactionState, setInteractionState] = useInteractionState({
    responseIdentifier,
    encode: userInput =>
      userInput.reduce((interactionState, identifier) => ({...interactionState, [identifier]: true}), {}),
    decode: interactionState => Object.keys(interactionState).filter(identifier => interactionState[identifier]),
    shouldUpdate: newInteractionState => {
      const current = Object.entries(interactionState);
      const next = Object.entries(newInteractionState);
      const [choice, checked] = next.filter(([response, checked]) =>
        current.length < next.length ? !interactionState[response] : checked !== interactionState[response]
      )[0];
      const [rowIdentifier, colIdentifier] = choice.split(' ');

      return checked ? matchSet.check(rowIdentifier, colIdentifier) : matchSet.uncheck(rowIdentifier, colIdentifier);
    },
  });

  return (
    <>
      <Prompt>{elementChildren.querySelector('prompt').textContent}</Prompt>
      <InteractionStateContext.Provider value={{interactionState, setInteractionState}}>
        <MatchTable set={matchSet} />
      </InteractionStateContext.Provider>
    </>
  );
};

export default MatchInteraction;
