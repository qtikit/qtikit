import React, {useEffect, useMemo} from 'react';
import {UserInput} from '@qtikit/model/lib/user-input';

import * as Qti from './qti';
import {fetchText, getBaseUrl, isUrlResourceType, resolveUrl, ResourceSrc, trimXml, useThrowError} from './utils';

// @TODO integrate with
interface AssessmentResource {
  itemBody: Element;
  styles: string[];
  correctResponses: any;
}

const ItemBody: React.FC<{itemBody: Element}> = React.memo(({itemBody}) => <>{Qti.renderItemBody(itemBody)}</>);

const Root: React.FC<AssessmentItem> = ({itemBody, styles}) => {
  // useMemo is not fit for multiple ref scenario. but I have no idea for now.
  // This code can become problematic later for the following reasons:
  // https://reactjs.org/docs/hooks-reference.html#usememo
  // > You may rely on useMemo as a performance optimization, not as a semantic guarantee.
  const styleRefs = useMemo(() => styles.map(() => React.createRef<HTMLStyleElement>()), [styles]);
  useEffect(() => {
    for (const ref of styleRefs) {
      if (!ref.current?.sheet) continue;
      const cssRules = ref.current.sheet.cssRules;
      for (const rule of cssRules) {
        const oldSelectorText = (rule as any).selectorText as string;
        const newSelectorText = oldSelectorText
          .split(',')
          .map(s => `[data-qtikit] ${s}`)
          .join(',');
        (rule as any).selectorText = newSelectorText;
      }
    }
  }, [styleRefs]);
  return (
    <>
      {styles.map((style, index) => (
        <style key={index} ref={styleRefs[index]}>
          {style}
        </style>
      ))}
      <ItemBody itemBody={itemBody} />
    </>
  );
};

export interface QtiViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  assessmentItem: AssessmentItem;
  stylesheet?: StyleSheet;
  inputState: UserInput;
  onChange?: (newState: UserInput) => void;
  // @TODO, How to remove it? how to get res url from out-side
  // resourceBaseUrl?: string;
}

type QtiViewerContextValue = QtiViewerProps & {
  correctResponses?: any;
};

export const QtiViewerContext = React.createContext<QtiViewerContextValue>(null as any);

async function fetchResource(resourceSrc: ResourceSrc): Promise<string | null> {
  if (isUrlResourceType(resourceSrc)) {
    return await fetchText(resourceSrc.toString());
  } else if (typeof resourceSrc === 'string') {
    return resourceSrc;
  }

  return null;
}

async function fetchAssessmentItem(assessmentItemSrc: ResourceSrc): Promise<Document> {
  const xml = await fetchResource(assessmentItemSrc);

  if (!xml) {
    throw new Error(`Failed to fetch assessment item ${assessmentItemSrc}`);
  }

  return new DOMParser().parseFromString(trimXml(xml), 'text/xml');
}

async function fetchStyles(
  stylesheets: Element[],
  resourceBaseUrl: string,
  stylesheetSrc?: ResourceSrc
): Promise<string[]> {
  const stylesheetSrcs = stylesheets.map(stylesheet =>
    resolveUrl(stylesheet.getAttribute('href') || '', resourceBaseUrl)
  );
  const styleContent = await Promise.all(stylesheetSrcs.map(fetchText));

  styleContent.unshift(
    stylesheetSrc && isUrlResourceType(stylesheetSrc)
      ? await fetchText(stylesheetSrc.toString())
      : (stylesheetSrc as string)
  );

  return styleContent;
}

function readCorrectResponse(root: Document) {
  const responses = root.documentElement.getElementsByTagName('responseDeclaration');
  return Array.from(responses).reduce((correct, response) => {
    const identifier = response.getAttribute('identifier') ?? '__UNKNOWNN__';
    // @TODO mapElement('name', () => {}), reduceElement('tagName', (values, value) => {})
    correct[identifier] = Array.from(response.getElementsByTagName('value')).reduce((values, value) => {
      values[value.textContent ?? '__UNKNOWN__'] = true;
      return values;
    }, {} as any);

    return correct;
  }, {} as any);
}

async function fetchResources(
  assessmentItemSrc: ResourceSrc,
  resourceBaseUrl: string,
  readResponse: boolean,
  stylesheetSrc?: ResourceSrc
): Promise<AssessmentItem> {
  const root = await fetchAssessmentItem(assessmentItemSrc);
  const [itemBody] = root.documentElement.getElementsByTagName('itemBody');

  if (!itemBody) {
    throw new Error('QTI itemBody is not found');
  }

  const stylesheets = Array.from(root.getElementsByTagName('stylesheet'));
  const styles = await fetchStyles(stylesheets, resourceBaseUrl, stylesheetSrc);

  return {
    itemBody,
    styles,
    correctResponses: readResponse ? readCorrectResponse(root) : null,
  };
}

function getResourceBaseUrl(assessmentItemSrc: ResourceSrc, resourceBaseUrl: string): string {
  if (!resourceBaseUrl && !isUrlResourceType(assessmentItemSrc)) {
    throw new Error('resourceBaseUrl is required when assessmentItemSrc is an URL');
  }

  return resourceBaseUrl || getBaseUrl(assessmentItemSrc.toString());
}

const defaultValue: QtiViewerContextValue = {
  // resourceBaseUrl: '',
  assessmentItem: {} as AssessmentItem,
  inputState: {},
  // correctResponses: {},
  onChange: () => {},
};

const QtiViewer: React.FC<QtiViewerProps> = props => {
  const {assessmentItem, stylesheet, inputState, onChange, ...divProps} = props;
  // const [assessmentItem, setAssessmentItem] = React.useState<AssessmentItem | null>(null);
  const throwError = useThrowError();
  // const resourceBaseUrl = getResourceBaseUrl(assessmentItemSrc, props.resourceBaseUrl ?? '');

  useEffect(() => {
    const loadAssessmentItem = async () => {
      try {
        // setAssessmentItem(await fetchResources(assessmentItemSrc, resourceBaseUrl, !onChange, stylesheetSrc));
        // conditional fetching
      } catch (e: any) {
        throwError(e);
      }
    };

    loadAssessmentItem();
    return () => {
      setAssessmentItem(null);
    };
  }, [assessmentItemSrc, onChange, resourceBaseUrl, stylesheetSrc, throwError]);

  return (
    <QtiViewerContext.Provider
      value={{
        ...defaultValue,
        ...props,
        resourceBaseUrl,
        correctResponses: assessmentItem?.correctResponses ?? null,
      }}>
      <div data-qtikit {...divProps}>
        {assessmentItem && <Root {...assessmentItem} />}
      </div>
    </QtiViewerContext.Provider>
  );
};

export default QtiViewer;
