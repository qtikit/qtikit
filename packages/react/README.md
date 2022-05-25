# @qtikit/react

> React component to render from QTI models and stylesheets in XML. The component exposes the QTI interaction and passes the result to the host component

# Install

```sh
npm install @qtikit/react
```

# Usage

## Basic Samples

```ts
import React from 'react';
import QtiViewer from '@qtikit/react/lib'
import { UserInput } from '@qtikit/model/lib/user-input';

const Home = () => {
  const [inputState, setInputState] = React.useState <UserInput>({});
  const assessmentItemSrc = 'https://yoursite.com/assessment.xml';
  const stylesheetSrc = 'https:/yoursite.com/qti-default.css';

  return (
    <div className={styles.container}>
      <QtiViewer
        assessmentItemSrc={assessmentItemSrc}
        stylesheetSrc={stylesheetSrc}
        inputState={inputState}
        onChange={setInputState}
      />
    </div>
  )
}

export default Home
```

# Options

With common options and each Qti Viewers has unique options for rendering. Please check out options below

```js
const viewOptions = {
  // shared
  showLaTex?: boolean; // display LaTeX syntax in text
  
  // for ItemBody
  showCorrectResponse?: boolean; // show correct resposnes

  // for ModalFeedback
  identifiers: string[]; // show only feedback that matches an identifiers ex) ['correct']
}
```

## Actions (Events)

QtiViewer will fire events to give a chance of manipulating or to notify the status of progress. For example, before starting fetch, after resource fetching completed. See `QtiViewerAction` and `QtiViewerActions` to get information of types

```
<QtiViewer
  assessmentItemSrc={assessmentItemSrc}
  stylesheetSrc={stylesheetSrc}
  inputState={inputState}
  onChange={setInputState}
  onAction: (action: QtiViewerAction) => {
    const res: QtiViewerAction = action;

    if (action.type) {
      res.url = updateUrlWithConfidential(action.url);
    }

    return res;
  }
/>
```

## Stylesheet

QtiViewer supports custom stylesheets to display QTI Interactions and Components in their own style. CSS class names follow [BEM style][bem]. Refer to [Example][css-style]. Here is a sample that shows how to use a stylesheet.

- Fetch a stylesheet from remote, and applies it to scoped CSS under the root element of QtiViewer.
  ```
  <QtiViewer
    assessmentItemSrc={assessmentItemSrc}
    stylesheetSrc={'https://yoursite.com'}
    inputState={inputState}
    onChange={setInputState}
  />
  ```
- In Next.js, You can use CSS in global and local. See the sample code below.
  - Global CSS, Add css path to __app.js
    ```
    import '../styles/qti-default.css'
    
    import type { AppProps } from 'next/app'

    function MyApp({ Component, pageProps }: AppProps) {
      return <Component {...pageProps} />
    }

    export default MyApp
    ```
  - Local CSS, You must use [a plugin](https://www.npmjs.com/package/next-cssloader-options) to update local CSS, css-loader options. CSS is loaded when the page loads
    ```
    // in next.config.js
    const withCssLoaderOptions = require('next-cssloader-options');

    module.exports = withCssLoaderOptions({
      cssLoaderOptions: {
        modules: {
          getLocalIdent: (context, localIdentName, localName, options) => localName
        }
      }
    });

    // in index.js
    import QtiStyles from '../styles/qtikit.module.css'

    const Home: NextPage = () => (
      <div className={QtiStyles.qtikitInteraction}>
        <QtiViewer
          assessmentItemSrc={assessmentItemSrc}
          inputState={inputState}
          onChange={setInputState}
        />
      </div>
    )
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
