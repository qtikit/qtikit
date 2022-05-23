export const enum QtiViewerActions {
  REQUEST_RESOURCE,
}

export type QtiViewerAction = {
  type: QtiViewerActions;
  url?: string;
};
