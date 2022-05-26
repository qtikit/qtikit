import React, {useEffect} from 'react';

import {QtiStyles, StyleProp} from './Styles';
import {QtiDocument} from './document';
import {ViewerEvents, ViewerOptions, ViewerState} from '../types/viewer';

export type ViewContextValue = ViewerState & {
  document: QtiDocument;
  events: ViewerEvents;
  options?: ViewerOptions;
};

export const ViewContext = React.createContext<ViewContextValue>(null as any);

export type ViewProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  children: JSX.Element;
  state: ViewerState;
  document: QtiDocument;
  events: ViewerEvents;
  options?: ViewerOptions;
};

export const View = ({children, state, document, events, options, ...props}: ViewProps) => {
  const [styles, setStyles] = React.useState<StyleProp | null>(null);

  useEffect(() => {
    const fetchStyleSheets = async () => {
      await document.fetchStyleSheets(events.onFetchStart);
      setStyles({styles: document.stylesheets ?? []});
    };

    fetchStyleSheets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);

  return (
    <div data-qtikit {...props}>
      {styles && <QtiStyles styles={styles.styles} />}
      <ViewContext.Provider
        value={{
          document,
          options,
          events,
          ...state,
        }}>
        {children}
      </ViewContext.Provider>
    </div>
  );
};
