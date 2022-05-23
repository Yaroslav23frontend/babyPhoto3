import React, {useContext, useState} from 'react';
const ScaleRotateContext = React.createContext();
export function useScaleRotate() {
  return useContext(ScaleRotateContext);
}
export default function ScaleRotateProvider({children}) {
  const [tempRotate, setTempRotate] = useState(0);
  const [tempScale, setTempScale] = useState(1);
  const value = {
    tempRotate,
    setTempRotate,
    tempScale,
    setTempScale,
  };
  return (
    <ScaleRotateContext.Provider value={value}>
      {children}
    </ScaleRotateContext.Provider>
  );
}
