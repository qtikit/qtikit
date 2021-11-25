import React from 'react';

export interface Current {
  name: string;
  value: string;
  node?: React.ReactNode;
}

interface DragDropValue {
  current: Current | null;
  setCurrent: (current: Current | null) => void;
}

const DragDropContext = React.createContext<DragDropValue | null>(null);

export const DragDropContextProvider: React.FC = ({children}) => {
  const [current, setCurrent] = React.useState<Current | null>(null);

  return <DragDropContext.Provider value={{current, setCurrent}}>{children}</DragDropContext.Provider>;
};

export const useDragDropContext = () => {
  const context = React.useContext(DragDropContext);

  if (!context) {
    throw new Error('useDragDropContext must be used within a DragDropContext');
  }

  return context;
};

export default DragDropContext;
