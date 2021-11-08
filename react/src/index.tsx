import React from "react";

import QTI from "./qti";

export default class QTIViewer extends React.Component<{ xml: string }> {
  component: React.ReactElement[] | null;

  constructor(props: { xml: string }) {
    super(props);
    this.component = QTI.createComponent(props.xml);
  }

  public render(): JSX.Element {
    return <>{this.component}</>;
  }
}
