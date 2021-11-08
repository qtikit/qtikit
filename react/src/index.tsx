import React from "react";

import QTI from "./qti";

export default class RiiidQTIV22Viewer {
  component: React.ReactElement[] | null;

  constructor(private xml: string) {
    this.component = QTI.createComponent(xml);
  }

  public render(): JSX.Element {
    return <>{this.component}</>;
  }
}
