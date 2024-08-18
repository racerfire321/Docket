import React, { createContext, useState } from 'react';

export interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light', 
  toggleTheme: () => {},
  
});
