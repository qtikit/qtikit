import React from 'react';
import {SimpleAssociableChoiceCharacteristics} from '@qtikit/model/lib/qti2_2';

import {getPropsByElement} from '../utils/node';
import CheckBox from './Checkbox';
import {classNameForComponent} from '../utils/style';
import {parseBoolean} from '../utils/type';
import {isSortableElement} from '../characteristics/Shuffle';

export type SimpleAssociableChoice = Omit<SimpleAssociableChoiceCharacteristics, 'identifier' | 'matchMax'> & {
  identifier: string;
  textContent: any;
  matchMax: number;
  matchCount: number;
};

type SimpleMatchSetProps = {
  sourceChoices: SimpleAssociableChoice[];
  targetChoices: SimpleAssociableChoice[];
};

const SimpleMatchSet: React.FC<SimpleMatchSetProps> = ({sourceChoices, targetChoices}) => {
  return (
    <span className={classNameForComponent('match-table')}>
      <table>
        <tbody>
          <tr>
            <th></th>
            {targetChoices.map(({textContent}, colIndex) => (
              <td key={colIndex}>{textContent}</td>
            ))}
          </tr>
          {sourceChoices.map(({identifier: row, textContent}, rowIndex) => (
            <tr key={rowIndex}>
              <th>{textContent}</th>
              {targetChoices.map(({identifier: col}, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                  <CheckBox identifier={`${col} ${row}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </span>
  );
};

function getSimpleAssociableChoice(choicesNode: NodeList, shuffle = false): SimpleAssociableChoice[] {
  return Array.from(choicesNode)
    .sort(first => (shuffle ? isSortableElement(first) : 0))
    .map(choice => {
      const {matchMax, identifier, fixed} = getPropsByElement(choice as Element);
      return {
        identifier: identifier as string,
        textContent: choice.textContent?.trim(),
        matchMax: matchMax as number,
        matchCount: 0,
        fixed: parseBoolean(fixed),
      };
    });
}

function getSimpleAssociableChoices(simpleMatchSet: Element, shuffle = false): SimpleMatchSetProps {
  const choices = simpleMatchSet.querySelectorAll('simpleMatchSet');
  return {
    sourceChoices: getSimpleAssociableChoice(choices[0].childNodes, shuffle),
    targetChoices: getSimpleAssociableChoice(choices[1].childNodes, shuffle),
  };
}

const useSimpleMatchSet = (element: Element, maxAssociationCount = 0, shuffle = false) => {
  const [associationCount, setAssociationCount] = React.useState(0);

  const simpleMatchSet = React.useMemo(() => getSimpleAssociableChoices(element, shuffle), [element, shuffle]);

  const checkChoice = React.useCallback(
    (identifier: string, check: boolean) => {
      if (check && associationCount >= maxAssociationCount) {
        return false;
      }

      const [rowIdentifier, colIdentifier] = identifier.split(' ');
      const col = simpleMatchSet.sourceChoices.find(choice => choice.identifier === colIdentifier);
      const row = simpleMatchSet.targetChoices.find(choice => choice.identifier === rowIdentifier);

      if (!col || !row) {
        console.error('Could not find choice', rowIdentifier, colIdentifier);
        return false;
      }

      if (check && (col.matchCount >= col.matchMax || row.matchCount >= row.matchMax)) {
        return false;
      }

      const increment = check ? 1 : -1;
      row.matchCount += increment;
      col.matchCount += increment;

      setAssociationCount(associationCount + increment);

      return true;
    },
    [simpleMatchSet, associationCount]
  );

  return {simpleMatchSet, associationCount, checkChoice};
};

export {useSimpleMatchSet};
export default SimpleMatchSet;
