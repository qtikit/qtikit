import React, {useContext, useEffect} from 'react';

import {ViewContext} from '../views/View';
import {classNameForComponent} from '../utils/style';
import {useFetchEvent} from '../utils/events';

export type ObjectHtmlProps = React.ObjectHTMLAttributes<HTMLImageElement>;

const ObjectHtml: React.FC<ObjectHtmlProps> = ({data, type, children, ...props}) => {
  const {
    document: {baseUrl},
  } = useContext(ViewContext);

  const {fetchSrc, fetchStart, fetchEnd} = useFetchEvent('object', data, baseUrl);

  useEffect(() => {
    fetchStart({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className={classNameForComponent('object')}>
      {type?.includes('image') ? (
        <img src={fetchSrc} {...props} onError={fetchEnd} onLoad={fetchEnd} />
      ) : (
        <div>{`type: ${type} doesn't allow to render. ${fetchSrc}`}</div>
      )}
    </span>
  );
};

export default ObjectHtml;
