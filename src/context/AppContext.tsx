import React, { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppContextProvider = (props: any) => {
  const [inCall, setInCall] = useState(null);

  const value = {
    inCall,
    setInCall,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
