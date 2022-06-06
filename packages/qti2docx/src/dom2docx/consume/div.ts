import {consumeChildren, ConsumeFn, ConsumeTable} from '.';

export default function createConsumeTable(): ConsumeTable {
  return { div, p: div, pre: div };
}

export const div: ConsumeFn = (config) => {
  consumeChildren({ ...config, isBlock: true });
};
