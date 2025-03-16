import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for the theme on initial load
const storedTheme = localStorage.getItem('theme') || 'light';

const initialState = {
  theme: storedTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      localStorage.setItem('theme', newTheme); // Save theme to localStorage
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
