import React, {useContext, useEffect} from 'react';

import {QtiViewerEvents, QtiViewerEventType} from '../types/viewer';
import {ViewContext} from '../views/View';
import {isBlobUrl, resolveUrl} from './url';

export async function fetchText(src: string): Promise<string> {
  return await fetch(src).then(response => response.text());
}

export type FetchResponseTypes = 'url' | 'text' | 'blob' | 'arrayBuffer' | 'json';

export type FetchResponse = {
  type: FetchResponseTypes;
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
  const retrievedUrl = events.onFetchStart ? await events.onFetchStart({type, url, baseUrl}) : url;
  const response = {
    type: (isBlobUrl(retrievedUrl) ? 'blob' : 'url') as FetchResponseTypes,
    data: isBlobUrl(retrievedUrl) ? retrievedUrl : resolveUrl(url || '', baseUrl),
  };

  return response;
}

export async function fetchStyles(styleUrls: string[], baseUrl: string, events: QtiViewerEvents) {
  const endFetch = (url: string) => events.onFetchEnd && events.onFetchEnd({type: 'style', url, baseUrl});
  return await Promise.all(
    styleUrls.map(async url => {
      const response = await fetchData('style', url, baseUrl, events);
      if (response.type === 'url') {
        const style = fetchText(response.data);
        endFetch(url);
        return style;
      }

      endFetch(url);
      return Promise.resolve(response.data);
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
