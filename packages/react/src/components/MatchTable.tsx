import * as React from 'react';

import MatchSet from '../interactions/MatchInteraction/MatchSet';
import {classNameForComponent} from '../utils/style';
import CheckBox from './Checkbox';

export interface MatchTableProps {
  set: MatchSet;
}

const MatchTable: React.FC<MatchTableProps> = ({set}) => (
  <span className={classNameForComponent('match-table')}>
    <table>
      <tbody>
        <tr>
          <th></th>
          {set.cols().map(({textContent}, colIndex) => (
            <td key={colIndex}>{textContent}</td>
          ))}
        </tr>
        {set.rows().map(({identifier: row, textContent}, rowIndex) => (
          <tr key={rowIndex}>
            <th>{textContent}</th>
            {set.cols().map(({identifier: col}, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`}>
                <CheckBox identifier={`${row} ${col}`} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </span>
);

export default MatchTable;
