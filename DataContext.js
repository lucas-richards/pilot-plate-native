import React, { createContext, useState } from 'react';

export const DbContext = createContext();

export const DataProvider = ({ children }) => {
  const [dbChange, setDbChange] = useState(false)
  const [user, setUser] = React.useState(null);

  return (
    <DbContext.Provider value={{ dbChange, setDbChange, user, setUser }}>
      {children}
    </DbContext.Provider>
  );
};
