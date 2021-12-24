import React from "react";

type QtiChildren = boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | React.ReactNode[] | null | undefine;

function splitChildren(children: QtiChildren) {
    const rest = React.Children.toArray(children);
    return {
      prompt: rest.splice(0, 1),
      restChildren: rest,
    }
}
const QtiInteraction: React.FC = ({children}) => {
  const {prompt, restChildren} = splitChildren(children);
  return (
  );
};

export default QtiInteraction;
