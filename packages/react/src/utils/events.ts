import {useContext, useMemo} from 'react';

import {QtiViewerEventType} from '../types/viewer';
import {ViewContext} from '../views/View';
import {resolveBaseUrl} from './url';

export const useFetchEvent = (type: QtiViewerEventType, src?: string, baseUrl?: string) => {
  const {
    events: {onResolveUrl, onFetchStart, onFetchEnd},
  } = useContext(ViewContext);
  const resolvedSrc = useMemo(() => (src ? resolveBaseUrl(src, baseUrl) : undefined), [src, baseUrl]);
  const option = {
    type,
    url: resolvedSrc ?? '',
    baseUrl,
  };

  return {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchSrc: useMemo(() => (resolvedSrc && onResolveUrl?.(resolvedSrc)) ?? resolvedSrc, [resolvedSrc]),
    fetchStart: (event: any) => onFetchStart?.({...option, event}),
    fetchEnd: (event: any) => onFetchEnd?.({...option, event}),
  };
};
