import { createContext, useState, useContext } from 'react';

const CategoryMenuContext = createContext();

export const useCategoryNav = () => useContext(CategoryMenuContext);

export const CategoryMenuProvider = ({ children }) => {
  const [isCategoryNavOpen, setIsCategoryNavOpen] = useState(false);

  const toggleCategoryNav = () => setIsCategoryNavOpen(!isCategoryNavOpen);

  return (
    <CategoryMenuContext.Provider value={{ isCategoryNavOpen, toggleCategoryNav }}>
      {children}
    </CategoryMenuContext.Provider>
  );
};
