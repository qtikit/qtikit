import {UserInput} from '@qtikit/model/lib/user-input';

import {QtiDocument} from '../views/Document';

export type QtiViewerState = {
  inputState: UserInput;
  onChange?: (newState: UserInput) => void;
};

export type QtiViewerEventType = 'fetch' | 'image' | 'math' | 'object' | 'style';

export type QtiViewerEvent = {
  type: QtiViewerEventType;
  event?: any;
};

export type QtiFetchEvent = QtiViewerEvent & {
  url: string;
  baseUrl?: string;
};

export type QtiViewerEvents = {
  onResolveUrl?: (url: string) => string;
  onFetchStart?: (event: QtiFetchEvent) => string;
  onFetchEnd?: (event: QtiFetchEvent) => string;
};

export type QtiViewerOptions = {
  showCorrectResponse?: boolean;
  showLaTex?: boolean;
  showIdentifiers?: string[];
};

export type QtiViewerProps = QtiViewerState &
  QtiViewerEvents & {
    document: QtiDocument;
    options?: QtiViewerOptions;
  };
