import React from 'react';
import {ComponentStory} from '@storybook/react';

import QtiViewer from '../';

const BASE_URL = process.env.VERCEL_URL ?? 'http://localhost:6006';

export const QtiViewerTemplate: ComponentStory<typeof QtiViewer> = args => {
  const [inputState, setInputState] = React.useState({});

  args.assessmentItemSrc = `${BASE_URL}/tests/${args.assessmentItemSrc}`;
  args.inputState = inputState;
  args.onChange = (value: any) => {
    setInputState(value);
  };

  return <QtiViewer {...args} />;
};
