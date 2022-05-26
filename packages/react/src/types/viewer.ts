import {UserInput} from '@qtikit/model/lib/user-input';

import {QtiDocument} from '../views/Document';

export type QtiViewerState = {
  inputState: UserInput;
  onChange?: (newState: UserInput) => void;
};

export type QtiViewerEvent = {
  type: 'fetchstart';
};

export type FetchStartEvent = QtiViewerEvent & {
  url: string;
  baseUrl?: string;
};

export type QtiViewerEvents = {
  onFetchStart?: (event: FetchStartEvent) => string;
};

export type QtiViewerOptions = {
  showCorrectResponse?: boolean;
  showLaTex?: boolean;
};

export type QtiViewerProps = QtiViewerState &
  QtiViewerEvents & {
    document: QtiDocument;
    options?: QtiViewerOptions;
  };
