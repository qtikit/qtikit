import React from 'react';

export const useThrowError = () => {
  const [, setState] = React.useState();

  return [
    React.useMemo(
      () => (error: {error: Error | string | null}) =>
        setState(() => {
          throw typeof error === 'string' ? new Error(error) : error;
        }),
      []
    ),
  ];
};
