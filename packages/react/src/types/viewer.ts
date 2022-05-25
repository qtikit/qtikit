import {UserInput} from '@qtikit/model/lib/user-input';

export type ViewerState = {
  inputState: UserInput;
  onChange?: (newState: UserInput) => void;
};

export type ViewerEvent = {
  type: 'fetchstart';
};

export type FetchStartEvent = ViewerEvent & {
  url: string;
  baseUrl?: string;
};

export type ViewerEvents = {
  onFetchStart?: (event: FetchStartEvent) => string;
};

export type ViewerOptions = {
  showCorrectResponse?: boolean;
  showLaTex?: boolean;
  showIdentifiers?: string[];
};
