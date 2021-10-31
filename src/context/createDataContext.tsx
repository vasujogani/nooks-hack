import React, { useReducer, createContext } from "react";

export default (
  reducer: (state: any, action: any) => any,
  actions: any,
  defaultValue: any
) => {
  const Context = createContext<typeof actions>({});

  const Provider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions: any = {};
    Object.keys(actions).map((key) => {
      if (key) {
        boundActions[key] = actions[key](dispatch);
      }
    });

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
