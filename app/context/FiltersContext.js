import React, {useContext, useState} from 'react';
const FiltersContext = React.createContext();
export function useFilters() {
  return useContext(FiltersContext);
}
export default function FiltersProvider({children}) {
  const [brightnessValue, setBrightnessValue] = useState(1);
  const [contrastValue, setContrastValue] = useState(1);
  const value = {
    brightnessValue,
    setBrightnessValue,
    contrastValue,
    setContrastValue,
  };
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}
