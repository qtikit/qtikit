import {consumeChildren, ConsumeFn, ConsumeTable} from '.';

export default function createConsumeTable(): ConsumeTable {
  return { span, b, i, strong: b, em: i };
}

export const span: ConsumeFn = (config) => consumeChildren(config);

export const b: ConsumeFn = (config) => consumeChildren({
  ...config,
  runStyleContext: {
    ...config.runStyleContext,
    bold: true,
  }
});

export const i: ConsumeFn = (config) => consumeChildren({
  ...config,
  runStyleContext: {
    ...config.runStyleContext,
    italic: true,
  }
});
