import {useContext, useMemo} from 'react';

import {QtiViewerContext} from '../QtiViewer';
import {QtiViewerActions} from '../types/action';

export const useResourceRequestAction = (url: string) => {
  const {onAction} = useContext(QtiViewerContext);
  return useMemo(
    () =>
      onAction?.({
        type: QtiViewerActions.REQUEST_RESOURCE,
        url,
      }).url ?? url,
    [onAction, url]
  );
};
