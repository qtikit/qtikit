import React, {useEffect} from 'react';

import {QtiStyles, StyleProp} from './Styles';
import {QtiDocument, RenderOption} from './document';
import {QtiViewerEvents, QtiViewerOptions, QtiViewerState} from '../types/viewer';

export type QtiViewContextValue = QtiViewerState & {
  document: QtiDocument;
  events: QtiViewerEvents;
  options?: QtiViewerOptions;
};

export const ViewContext = React.createContext<QtiViewContextValue>(null as any);

export type QtiViewProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  children: JSX.Element;
  state: QtiViewerState;
  document: QtiDocument;
  events: QtiViewerEvents;
  options?: QtiViewerOptions;
};

export const QtiBody: React.FC<{
  name: string;
  document: QtiDocument;
  root?: Element;
  renderOptions?: RenderOption;
}> = React.memo(({name, document, root, renderOptions}) => (
  <div className={name}>{document.render(root, renderOptions)}</div>
));

export const QtiView = ({children, state, document, events, options, ...props}: QtiViewProps) => {
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
