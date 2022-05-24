export const enum ActionTypes {
  REQUEST_RESOURCE,
}

export type Action = {
  type: ActionTypes;
  url?: string;
};

export type RequestResourceAction = Action & {
  changeUrl: (url: string) => void;
};
