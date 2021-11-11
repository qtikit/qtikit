import React, { useEffect } from "react";

import * as Qti from "@src/qti";
import { UserInput } from "@qtikit/model/src/user-input";
import { getBaseUrl } from "./utils/url";

export const QtiViewerContext = React.createContext<{
  baseUrl: string;
}>(null as any);

export interface QtiViewerProps {
  assessmentItemSrc: string;
  inputState: UserInput;
  onChange: (newState: UserInput) => void;
}

const QtiViewer: React.FC<QtiViewerProps> = (props) => {
  const [xml, setXml] = React.useState<string>("");

  useEffect((): void => {
    const loadXml = async () => {
      const xml = await fetch(props.assessmentItemSrc).then((response) =>
        response.text()
      );
      setXml(xml);
    };

    loadXml();
  }, []);

  return (
    <QtiViewerContext.Provider
      value={{ baseUrl: getBaseUrl(props.assessmentItemSrc) }}
    >
      {xml && Qti.createComponent(xml)}
    </QtiViewerContext.Provider>
  );
};

export default QtiViewer;
