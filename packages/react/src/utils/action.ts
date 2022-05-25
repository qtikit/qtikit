import {useContext, useMemo} from 'react';

import {ViewerActionTypes} from '../types/viewer';
import {ViewContext} from '../views/View';

export const useResourceRequestAction = (url: string) => {
  const {onAction} = useContext(ViewContext);
  return useMemo(
    () =>
      onAction?.({
        type: ViewerActionTypes.REQUEST_RESOURCE,
        url,
      }).url ?? url,
    [onAction, url]
  );
};
