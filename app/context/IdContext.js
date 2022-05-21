import React, { useContext, useState } from "react";
const IdContext = React.createContext();
export function useId() {
  return useContext(IdContext);
}
export default function IdProivider({ children }) {
  const [id, setId] = useState(0);
  const value = {
    id,
    setId,
  };
  return <IdContext.Provider value={value}>{children}</IdContext.Provider>;
}
