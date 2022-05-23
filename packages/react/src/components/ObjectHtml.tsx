import React, {useContext} from 'react';

import {ViewContext} from '../views/View';
import {classNameForComponent} from '../utils/style';
import {useFetchData} from '../utils/fetch';

export type ObjectHtmlProps = React.ObjectHTMLAttributes<HTMLImageElement>;

const ObjectHtml: React.FC<ObjectHtmlProps> = ({data, type, children, ...props}) => {
  const {
    document: {baseUrl},
  } = useContext(ViewContext);

  const [retrivedData, onFetchEnd] = useFetchData('object', data ?? '', baseUrl);

  return (
    <span className={classNameForComponent('object')}>
      {type?.includes('image') ? (
        retrivedData && <img src={retrivedData} {...props} onError={onFetchEnd} onLoad={onFetchEnd} />
      ) : (
        <div>{`type: ${type} doesn't allow to render. ${data}`}</div>
      )}
    </span>
  );
};

export default ObjectHtml;
