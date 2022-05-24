import React from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';

import {Action} from '../types/action';
import {Styles} from './Styles';

export type CorrectResponses = any;

export type UrlData = {
  url: string;
  data?: string;
};

export type Source = UrlData | string;

export type XmlSource = {
  url: string;
  document?: string;
};

export type ViewSource = {
  xml: string;
  style?: string;
};

export type ViewState = {
  inputState: UserInput;
  onChange?: (newState: UserInput) => void;
  onAction?: (newAction: Action) => Action;
};

export type ViewOptions = {
  correctResponse?: boolean;
  // formulaInput?: QtiViewerFormulaInput;
  // modalFeedbacks?: QtiViewerModalFeedbacks;
};

export type ViewContextValue = ViewState & {
  baseUrl: string;
  correctResponses?: CorrectResponses;
};

const ViewContext = React.createContext<ViewContextValue>(null as any);

export type ViewProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> &
  ViewContextValue & {
    styles?: string[];
    children: JSX.Element;
  };

export const View = ({
  styles,
  children,
  baseUrl,
  correctResponses,
  inputState,
  onChange,
  onAction,
  ...props
}: ViewProps) => {
  return (
    <div data-qtikit {...props}>
      {styles && <Styles styles={styles} />}
      <ViewContext.Provider
        value={{
          baseUrl,
          correctResponses,
          inputState,
          onChange,
          onAction,
        }}>
        {children}
      </ViewContext.Provider>
    </div>
  );
};
