# @qtikit/react

> React component to render from QTI models and stylesheets in XML. The component exposes the QTI interaction and passes the result to the host component

# Install

```sh
npm install @qtikit/react
```

# Usage

## Props

```js
const viewerProps = {
  // data model and manager for QtiViewers
  document: QtiDocument;
  // user's response of user interaction
  inputState: UserInput;
  // event called as user input a response
  onChange: (newState: UserInput) => void;
  // event called as fetch starting
  onFetchStart?: (event: QtiFetchEvent) => Promise<string>
  // event called as fetch ended
  onFetchEnd?: (event: QtiFetchEvent) => void;
  options?: ViewerOptions = {
    // display LaTeX syntax in text
    showLaTex?: boolean;
    // for ItemBody, show correct resposnes
    showCorrectResponse?: boolean;
    // for ModalFeedback, show only feedback that matches an identifiers
    // ex) {showIdentifiers: ['correct']}
    showIdentifiers: string[];
  }
}
```

## Document

Because of qti Viewers has multiple viewers, Host need to create Qti document first which can be able to render items. Qti document will try to get XML content via xml url passed into the document. and then you can use utility APIs to check the model

```js
function getSolutionViewer(document) {
  if (document.hasModalFeedback()) {
    return ModalFeedback;
  } else if (document.hasRubricBlock()) {
    return RubricBlock;
  } else {
    return null;
  }
}

function getCorrectResponse(document, index = 0) {
  responseIdentifier = document.interactions[0].responseIdentifier
  return document.correctResponses[responseIdentifier] ?? [];
} 

const document = await QtiDocument.create(xmlUrl, styleUrl);
const SolutionViewer = getSolutionViewer(document);
const CorrectionViewer = (
  <div>
    Answer: {getCorrectResponse(0)}
  </div>
)
```

## Basic Samples

```ts
import React from 'react';
import {ItemBody, ModalFeedback, QtiDocument, QtiFetchEvent, ViewerOptions} from '@qtikit/react/lib';
import { UserInput } from '@qtikit/model/lib/user-input';

const QtiViewer = () => {
  const [inputState, setInputState] = React.useState <UserInput>({});
  const [document, setDocument] = useState<QtiDocument | null>(null);

  useEffect(() => {
    const createDocument = async () => {
      const document = await QtiDocument.create('question.xml', 'default.css');
      setDocument(document);
    };

    createDocument();
  });

  return (
    <div>
      <ItemBody
        document={document}
        inputState={inputState}
        onChange={setInputState}
        onFetchStart={(event: QtiFetchEvent) => event.url}
        onFetchEnd={(event: QtiFetchEvent) => console.log('fetch event')}
        options: {
          showLaTex: true,
          showIdentifiers: ['correct'],
        }
      />
    </div>
  )
}
```

## Stylesheet

QtiViewer supports custom stylesheets to display QTI Interactions and Components in their own style. CSS class names follow [BEM style][bem]. Refer to [Example][css-style]. Here is a sample that shows how to use a stylesheet.

- Fetch a stylesheet from remote, and applies it to scoped CSS under the root element of QtiViewer. you can download Qti Document
  ```
  const document = await QtiDocument.create('question.xml', 'default.css');
  ```

- In Next.js, You can use CSS in global. See the sample code below.
  ```
  import '../styles/qti-default.css'
  
  import type { AppProps } from 'next/app'

  function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
  }

  export default MyApp
  ```

[bem]: http://getbem.com/naming/
[css-style]: https://qtikit-storybook.vercel.app/default.css

# Test

We're using Storybook to test and preview now with [IMSGlobal Sample Files][sample-files]. Please visit [our showcase][story-book] with a [assessment XML url][xml] as a param

[sample-files]: https://github.com/IMSGlobal/qti-examples
[story-book]: https://qtikit-storybook.vercel.app/
[xml]: https://qtikit-storybook.vercel.app/?path=/story/tests-qtiviewers--qti-viewers&assessmentItemSrc=https://raw.githubusercontent.com/riiid/qtikit/main/packages/react/.storybook/public/tests/items/choice.xml

# Example

## Choice Interaction

<p align="center">
<img width="503" alt="qti-sample" src="https://user-images.githubusercontent.com/124117/145538196-746e31b8-f0b0-4596-bbdb-2764483f8c04.png">
</p>
