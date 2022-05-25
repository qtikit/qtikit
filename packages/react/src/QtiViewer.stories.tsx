import {UserInput} from '@qtikit/model/lib/user-input';
import React, {useEffect, useState} from 'react';

import {ItemBody, ModalFeedback, QtiDocument} from './';
import {getPathName, resolveBaseUrl} from './utils/url';

function getXmlParam() {
  return new URL(location.href).searchParams.get('xml') ?? '';
}

class ErrorBoundary extends React.Component<{children: any}, {hasError: false; error: Error | null}> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error) {
    this.setState({
      error: error,
    });
  }

  render() {
    return this.state.hasError ? (
      <h3 style={{color: 'red'}}>{this.state.error && this.state.error.toString()}</h3>
    ) : (
      this.props.children
    );
  }
}

export const QtiViewerTemplate = ({xml, style, onAction, onMatch, options, modal}) => {
  const [inputState, setInputState] = useState<UserInput>({});
  const [document, setDocument] = useState<QtiDocument | null>(null);

  console.log('modal', modal);

  const Viewer = modal ? ModalFeedback : ItemBody;

  useEffect(() => {
    const create = async () => {
      const xmlUrl = xml.match(/^(http|https):\/\//) ? xml : resolveBaseUrl(xml);
      const document = await QtiDocument.create(xmlUrl, resolveBaseUrl(style ?? 'tests/styles/default.css'), url => {
        console.log('Fetch Resournce:', url);
        return url;
      });
      setDocument(document);
    };

    if (xml) {
      create();
    }
  }, [xml, style]);

  return (
    <>
      <h1>Input Assessment Urls</h1>
      <div>
        <h2>
          QTI: <a href={xml}>{getPathName(xml)}</a>
        </h2>
        <ErrorBoundary key={xml}>
          {document && (
            <Viewer
              document={document}
              inputState={inputState}
              onChange={setInputState}
              onAction={onAction}
              options={options}
            />
          )}
        </ErrorBoundary>
      </div>
    </>
  );
};

export const ItemBodyView = QtiViewerTemplate.bind({});

ItemBodyView.storyName = 'ItemBody';
ItemBodyView.args = {
  xml: getXmlParam(),
  options: {
    showLaTex: true,
  },
};

export const ModalFeedbackView = QtiViewerTemplate.bind({});

ModalFeedbackView.storyName = 'ModalFeedback';
ModalFeedbackView.args = {
  xml: getXmlParam(),
  modal: true,
  options: {
    showLaTex: true,
    identifiers: ['correct'],
  },
};

// const QtiSlideViewerTemplate = ({xml, style}) => {
//   const [assessmentItems, setAssessmentItems] = useState([]);
//   const [assessmentIndex, setAssessmentIndex] = useState(0);
//   const [inputState, setInputState] = useState<UserInput>({});

//   const prev = React.useCallback((): void => {
//     if (assessmentIndex > 0) {
//       setAssessmentIndex(assessmentIndex - 1);
//     }
//   }, [assessmentIndex]);

//   const next = React.useCallback((): void => {
//     if (assessmentIndex < assessmentItems.length - 1) {
//       setAssessmentIndex(assessmentIndex + 1);
//     }
//   }, [assessmentIndex, assessmentItems]);

//   useEffect(() => {
//     setAssessmentItems(normalizeUrls(xml));
//   }, [xml]);

//   return (
//     <>
//       <h1>Input Assessment Urls in Slide</h1>
//       <div>
//         <h2>
//           QTI: <a href={assessmentItems[assessmentIndex]}>{getPathName(assessmentItems[assessmentIndex])}</a>
//         </h2>
//         <div>
//           <button onClick={prev}>Previous</button>
//           <button onClick={next}>Next</button>
//         </div>
//         {assessmentItems.length > 0 ? (
//           <ErrorBoundary key={assessmentItems[assessmentIndex]}>
//             <QtiViewer
//               xml={assessmentItems[assessmentIndex]}
//               inputState={inputState}
//               onChange={setInputState}
//               style={style}
//             />
//           </ErrorBoundary>
//         ) : (
//           <h3>No Assessment Items</h3>
//         )}
//       </div>
//     </>
//   );
// };

// export const QtiSlideViewer = QtiSlideViewerTemplate.bind({});

// QtiSlideViewer.storyName = 'QtiSlideViewer';
// QtiSlideViewer.args = {
//   xml: getXmlParam(),
//   style: resolveUrl('default.css'),
// };

// const regexOnyxLaTex = (text: string) => [...text.matchAll(/\$\$(.*)\$\$/g)];

// const mapToKaTeXMatch = match => ({
//   pattern: match[0],
//   latex: match[1].replace(/\$/g, ''),
// });

// const formulaInputForLaTex = {
//   type: 'latex',
//   match: (text: string) => regexOnyxLaTex(text).map(mapToKaTeXMatch),
// };

// const modalFeedbacks = {
//   filter: (target: string) => {
//     console.log(target);
//   },
// };

// export const QtiViewerOptions = QtiViewerTemplate.bind({});

// QtiViewerOptions.storyName = 'QtiViewerOptions';
// QtiViewerOptions.args = {
//   xml: getXmlParam(),
//   style: resolveUrl('default.css'),
//   onAction: (action: QtiViewerAction) => {
//     console.log('onAction', action);
//     return action;
//   },
//   options: {
//     formulaInput: formulaInputForLaTex,
//     modalFeedbacks: modalFeedbacks,
//   },
// };

export default {
  title: 'Viewers/QtiViewer',
};
