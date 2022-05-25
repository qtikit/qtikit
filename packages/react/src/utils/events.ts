import {useContext, useMemo} from 'react';

import {ViewContext} from '../views/View';
import {resolveBaseUrl} from './url';

export const useFetchStartEvent = (src: string | undefined, baseUrl: string) => {
  const {
    events: {onFetchStart},
  } = useContext(ViewContext);
  const url = useMemo(() => resolveBaseUrl(src, baseUrl), [src, baseUrl]);

  return useMemo(
    () =>
      onFetchStart?.({
        type: 'fetchstart',
        url,
        baseUrl,
      }) ?? url,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseUrl, url]
  );
};
