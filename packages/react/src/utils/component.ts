import React from 'react';

type DividedComponent = {component: React.ReactNode[]; rest: React.ReactNode[]};

export function divideComponent(componentName: string, children: React.ReactNode): DividedComponent {
  const divided: DividedComponent = {
    component: [],
    rest: [],
  };

  React.Children.forEach(children, child => {
    if ((child as any)?.type?.displayName === componentName) {
      divided.component.push(child);
    } else {
      divided.rest.push(child);
    }
  });

  return divided;
}

export const useDividedComponent = (componentName: string, children: React.ReactNode) => {
  return React.useMemo(() => divideComponent(componentName, children), [children, componentName]);
};
