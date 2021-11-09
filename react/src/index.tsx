import React from "react";

import * as Qti from "./qti";

export default class QtiViewer extends React.Component<{ xml: string }> {
  component: React.ReactElement[] | null;

  constructor(props: { xml: string }) {
    super(props);
    this.component = Qti.createComponent(props.xml);
  }

  public render(): JSX.Element {
    return <>{this.component}</>;
  }
}
