import React, {useContext, useEffect} from 'react';

import {ViewContext} from '../views/View';
import {classNameForComponent} from '../utils/style';
import {useFetchEvent} from '../utils/events';

export type ObjectHtmlProps = React.ObjectHTMLAttributes<HTMLObjectElement>;

const ObjectHtml: React.FC<ObjectHtmlProps> = ({data, ...props}) => {
  const {
    document: {baseUrl},
  } = useContext(ViewContext);

  const {fetchSrc, fetchStart, fetchEnd} = useFetchEvent('object', data, baseUrl);

  useEffect(() => {
    fetchStart({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <span className={classNameForComponent('object')}>
      <object data={fetchSrc} {...props} onLoad={fetchEnd} />
    </span>
  );
};

export default ObjectHtml;
