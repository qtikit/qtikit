import React, {useEffect, useMemo} from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';

import {parseDocument, renderItemBody} from '../utils/renderer';
import {View, ViewProps, ViewState, ViewSource, ViewOptions, XmlSource} from './View';
// import {getBaseUrl, resolveUrl} from './utils/url';
// import {readCorrectResponse, trimXml} from './utils/xml';
import {useThrowError} from '../utils/error';
// import {Props} from './types/component';
// import {isTextNode} from './utils/node';
// import {KaTeXMatchArray} from './components/KaTeX';
// import {createKaTeXComponent} from './components';
// import {QtiViewerAction} from './types/action';
// import {Styles} from '../utils/style';

// interface renderOptions {
//   assessmentSrc: string;
//   itemBody: Element;
//   styles: string[];
//   correctResponses: any;
//   renderOptions: RenderOptions;
// }

// const ItemBodyContent: React.FC<{itemBody: Element; renderOptions: RenderOptions}> = React.memo(
//   ({itemBody, renderOptions}) =>
// );

// const defaultValue: QtiViewerContextValue = {
//   baseUrl: '',
//   renderOptionsSrc: '',
//   stylesheetSrc: '',
//   inputState: {},
// };

export type ItemBodyProps = {
  xmlSrc: XmlSource;
  styleSrc?: string;
  state: ViewState;
  options: ViewOptions;
};

type RenderOptions = {
  // assessmentSrc: string;
  itemBody: Element;
  styles: string[];
  // correctResponses: any;
  // renderOptions: RenderOptions;
};

export const ItemBody = ({xmlSrc, styleSrc, state, options, ...props}: ItemBodyProps) => {
  const [renderOptions, setRenderOptions] = React.useState<RenderOptions | null>(null);
  const throwError = useThrowError();

  useEffect(() => {
    setRenderOptions(null);

    const loadrenderOptions = async () => {
      try {
        setRenderOptions(await parseDocument(xmlSrc, styleSrc, options));
      } catch (e: any) {
        throwError(e);
      }
    };

    loadrenderOptions();

    return () => {
      setRenderOptions(null);
    };
  }, [throwError, xmlSrc, styleSrc, options]);
  return (
    renderOptions && (
      <View baseUrl={''} {...renderOptions} {...state} {...props}>
        <div className="qtikit-itembody">{renderItemBody(renderOptions.itemBody, renderOptions.renderOptions)}</div>
      </View>
    )
  );
};
