import {useContext, useMemo} from 'react';

import {QtiViewerEventType} from '../types/viewer';
import {ViewContext} from '../views/View';
import {resolveBaseUrl} from './url';

export const useFetchEvent = (type: QtiViewerEventType, src: string | undefined, baseUrl: string) => {
  const {
    events: {onResolveUrl, onFetchStart, onFetchEnd},
  } = useContext(ViewContext);
  const resolvedSrc = useMemo(() => resolveBaseUrl(src, baseUrl), [src, baseUrl]);
  const option = {
    type,
    url: resolvedSrc,
    baseUrl,
  };

  return {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchSrc: useMemo(() => onResolveUrl?.(resolvedSrc) ?? resolvedSrc, [resolvedSrc]),
    fetchStart: (event: any) => onFetchStart?.({...option, event}),
    fetchEnd: (event: any) => onFetchEnd?.({...option, event}),
  };
};
