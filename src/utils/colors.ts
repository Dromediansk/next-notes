type TextColorTypes = 'dark' | 'light'
type TextColors = {
  [key in TextColorTypes]: string
}

type BaseBackgroundColorTypes = 'white' | 'yellow' | 'blue' | 'green' | 'red'
type BaseBackgroundColors = {
  [key in BaseBackgroundColorTypes]: string
}

type AdditionalColorTypes = 'darkGrey' | 'darkGreen' | 'navyBlue' | 'deepPurple'
type BackgroundColors = {
  [key in BaseBackgroundColorTypes | AdditionalColorTypes]: string
}



export const TEXT_COLORS: TextColors = {
  dark: '#333333',
  light: '#f1f5f9'
}

export const BASE_BACKGROUND_COLORS: BaseBackgroundColors = {
  white: '#f1f5f9',
  yellow: '#FFFFCC',
  blue: '#E6F2FF',
  green: '#E6FFE6',
  red: '#FFCCCC',
}

export const BACKGROUND_COLORS: BackgroundColors = {
  ...BASE_BACKGROUND_COLORS,
  darkGrey: '#333333',
  navyBlue: '#000080',
  darkGreen: '#006400',
  deepPurple: '#800080'
}

export const getContrastColor = (backgroundColor: string) => {
  // Convert hex color to RGB
  let r = parseInt(backgroundColor.substring(1, 3), 16);
  let g = parseInt(backgroundColor.substring(3, 5), 16);
  let b = parseInt(backgroundColor.substring(5, 7), 16);

  // Calculate the relative luminance
  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Choose white or black based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

