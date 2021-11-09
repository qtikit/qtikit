import React from "react";

import * as Qti from "./qti";
import { UserInput } from "@qtikit/model/src/user-input";

export interface QtiViewerProps {
  xml: string;
  inputState: UserInput;
  onChange: (newState: UserInput) => void;
}

const QtiViewer: React.FC<QtiViewerProps> = (props) => {
  return <>{Qti.createComponent(props.xml)}</>;
};

export default QtiViewer;
