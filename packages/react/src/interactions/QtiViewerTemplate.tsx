import * as React from 'react';
import {ComponentStory} from '@storybook/react';

import QtiViewer from '../';

export const QtiViewerTemplate: ComponentStory<typeof QtiViewer> = args => {
  args.assessmentItemSrc = `http://localhost:6006/tests/${args.assessmentItemSrc}`;
  return <QtiViewer {...args} />;
};
