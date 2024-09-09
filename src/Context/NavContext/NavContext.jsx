import { createContext, useState, useContext } from 'react';

const NavContext = createContext();

export const useNav = () => useContext(NavContext);

export const NavProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <NavContext.Provider value={{ isNavOpen, toggleNav }}>
      {children}
    </NavContext.Provider>
  );
};
