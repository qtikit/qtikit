import {SimpleAssociableChoiceCharacteristics} from '@qtikit/model/lib/qti2_2';

import {getPropsByElement} from '../../utils/node';

type MatchSetChoice = Omit<SimpleAssociableChoiceCharacteristics, 'identifier' | 'matchMax'> & {
  identifier: string;
  textContent: any;
  matchMax: number;
  matchCount: number;
};

class MatchSet {
  associationCount = 0;
  table: MatchSetChoice[][];

  constructor(public maxAssociations: number, element: Element) {
    this.table = [...element.querySelectorAll('simpleMatchSet')]
      .sort((rows, cols) => cols.children.length - rows.children.length)
      .map(set => [...set.children].map(child => this.getAssociableChoice(child as Element)));
  }

  getAssociableChoice(choice: Element): MatchSetChoice {
    const {matchMax, identifier} = getPropsByElement(choice);
    return {
      identifier: identifier as string,
      textContent: choice.textContent?.trim(),
      matchMax: matchMax as number,
      matchCount: 0,
    };
  }

  getChoice(rowIdentifier: string, colIdentifier: string) {
    return {
      row: (this.table[0].find(choice => choice.identifier === rowIdentifier) ?? []) as MatchSetChoice,
      col: (this.table[1].find(choice => choice.identifier === colIdentifier) ?? []) as MatchSetChoice,
    };
  }

  check(rowIdentifier: string, colIdentifier: string) {
    if (this.associationCount >= this.maxAssociations) {
      console.log('rejected, max assoication count reached');
      return false;
    }

    return this.update(rowIdentifier, colIdentifier, 1);
  }

  uncheck(rowIdentifier: string, colIdentifier: string) {
    return this.update(rowIdentifier, colIdentifier, -1);
  }

  update(rowIdentifier: string, colIdentifier: string, increment: number) {
    const {row, col} = this.getChoice(rowIdentifier, colIdentifier);

    if (increment > 0 && (col.matchCount >= col.matchMax || row.matchCount >= row.matchMax)) {
      return false;
    }

    this.associationCount += increment;
    row.matchCount += increment;
    col.matchCount += increment;

    return true;
  }

  rows() {
    return this.table[0];
  }

  cols() {
    return this.table[1];
  }
}

export default MatchSet;
export {MatchSetChoice};
