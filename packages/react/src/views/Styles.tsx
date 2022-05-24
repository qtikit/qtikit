import React, {createRef, useEffect, useMemo} from 'react';

type StyleProp = {
  styles: string[];
};

function updateQueryPrefix(query: string, prefix: string) {
  return query
    .split(',')
    .map(s => `${prefix} ${s}`)
    .join(',');
}

export const Styles = ({styles}: StyleProp) => {
  // useMemo is not fit for multiple ref scenario. but I have no idea for now.
  // This code can become problematic later for the following reasons:
  // https://reactjs.org/docs/hooks-reference.html#usememo
  // > You may rely on useMemo as a performance optimization, not as a semantic guarantee.
  const refs = useMemo(() => styles.map(() => createRef<HTMLStyleElement>()), [styles]);

  useEffect(() => {
    for (const ref of refs) {
      if (ref.current?.sheet) {
        const cssRules = ref.current.sheet.cssRules;
        for (const rule of cssRules as any) {
          rule.selectorText = updateQueryPrefix(rule.selectorText, '[data-qtikit]');
        }
      }
    }
  }, [refs]);

  return (
    <>
      {styles.map((style, index) => (
        <style key={index} ref={refs[index]}>
          {style}
        </style>
      ))}
    </>
  );
};
