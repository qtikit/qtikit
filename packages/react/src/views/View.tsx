import React from 'react';

import {QtiStyles} from './Styles';
import {QtiDocument} from './document';
import {ViewerOptions, ViewerState} from '../types/viewer';

export type ViewContextValue = ViewerState & {
  document: QtiDocument;
  options?: ViewerOptions;
};

export const ViewContext = React.createContext<ViewContextValue>(null as any);

export type ViewProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  children: JSX.Element;
  state: ViewerState;
  document: QtiDocument;
  options?: ViewerOptions;
};

export const View = ({children, state, document, options, ...props}: ViewProps) => {
  return (
    <div data-qtikit {...props}>
      {document.stylesheets && <QtiStyles styles={document.stylesheets} />}
      <ViewContext.Provider
        value={{
          document,
          options,
          ...state,
        }}>
        {children}
      </ViewContext.Provider>
    </div>
  );
};
