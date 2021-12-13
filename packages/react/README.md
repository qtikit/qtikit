# @qtikit/react

> React component to render from QTI models and stylesheets in XML. The component exposes the QTI interaction and passes the result to the host component

# Example

## Choice Interaction

<p align="center">
<img width="503" alt="qti-sample" src="https://user-images.githubusercontent.com/124117/145538196-746e31b8-f0b0-4596-bbdb-2764483f8c04.png">
</p>

# Install

```sh
npm install @qtikit/react
```

# Usage

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


