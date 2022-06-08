import React, {useContext, useEffect} from 'react';

import {QtiViewerEvents, QtiViewerEventType} from '../types/viewer';
import {ViewContext} from '../views/View';
import {isBlobUrl, isSupportedUri, resolveUriType, resolveUrl} from './url';

export async function fetchText(src: string): Promise<string> {
  if (!isSupportedUri(src)) {
    throw new Error(`Unsupported URI: ${src}`);
  }

  return await fetch(src).then(response => response.text());
}

export type FetchResponse = {
  type: string;
  data: string;
};

export type FetchDataContextValue = QtiViewerEvents;

export const FetchDataContext = React.createContext<FetchDataContextValue>(null as any);

export async function fetchData(
  type: QtiViewerEventType,
  url: string,
  baseUrl: string,
  events: QtiViewerEvents
): Promise<FetchResponse> {
  const uri = events.onFetchStart ? await events.onFetchStart({type, url, baseUrl}) : url;

  if (!isSupportedUri(uri)) {
    throw new Error(`Unsupported URI: ${uri}`);
  }

  return {
    type: resolveUriType(uri),
    data: isBlobUrl(uri) ? uri : resolveUrl(url || '', baseUrl),
  };
}

export async function fetchStyles(styleUrls: string[], baseUrl: string, events: QtiViewerEvents) {
  const endFetch = (url: string) => events.onFetchEnd && events.onFetchEnd({type: 'style', url, baseUrl});
  return await Promise.all(
    styleUrls.map(async url => {
      const response = await fetchData('style', url, baseUrl, events);
      const styles = await fetchText(response.data);

      endFetch(url);
      return Promise.resolve(styles);
    })
  );
}

export const useFetchData = (
  type: QtiViewerEventType,
  url: string,
  baseUrl: string
): [string | null, (event?: any) => any] => {
  const {events} = useContext(ViewContext);
  const [data, setData] = React.useState<string | null>(null);

  const option = {
    type,
    url,
    baseUrl,
  };

  useEffect(() => {
    const fetch = async () => setData((await fetchData(type, url, baseUrl, events)).data);
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [data, (event?: any) => events.onFetchEnd?.({...option, event})];
};
