import {UserInput} from '@qtikit/model/lib/user-input';

import {MatchResult} from './match';

export const enum ViewerActionTypes {
  REQUEST_RESOURCE,
}

export type ViewerAction = {
  type: ViewerActionTypes;
  url?: string;
};

// export type RequestResourceAction = ViewerAction & {
//   changeUrl: (url: string) => void;
// };

export type ViewerState = {
  inputState: UserInput;
  onChange?: (newState: UserInput) => void;
  onAction?: (newAction: ViewerAction) => ViewerAction;
  onMatch?: (node: Node | Element) => MatchResult;
};

export type ViewerOptions = {
  showCorrectResponse?: boolean;
};
