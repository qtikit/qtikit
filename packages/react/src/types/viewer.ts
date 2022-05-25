import {UserInput} from '@qtikit/model/lib/user-input';

export const enum ViewerActionTypes {
  REQUEST_RESOURCE,
}

export type ViewerAction = {
  type: ViewerActionTypes;
  url?: string;
};

export type ViewerState = {
  inputState: UserInput;
  onChange?: (newState: UserInput) => void;
  onAction?: (newAction: ViewerAction) => ViewerAction;
};

export type ViewerOptions = {
  showCorrectResponse?: boolean;
  showLaTex?: boolean;
};
