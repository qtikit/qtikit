import {UserInput} from '@qtikit/model/lib/user-input';

import {QtiDocument} from '../views/QtiDocument';

export type QtiViewerState = {
  inputState: UserInput;
  onChange?: (newState: UserInput) => void;
};

export type QtiViewerEventType = 'xml' | 'image' | 'math' | 'object' | 'style';

export type QtiViewerEvent = {
  type: QtiViewerEventType;
  event?: any;
};

export type QtiFetchEvent = QtiViewerEvent & {
  url: string;
  baseUrl?: string;
};

export type QtiUri = string; // starts with 'http' | 'https' | 'blob';

export type QtiViewerEvents = {
  onFetchStart?: (event: QtiFetchEvent) => Promise<QtiUri>;
  onFetchEnd?: (event: QtiFetchEvent) => void;
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
