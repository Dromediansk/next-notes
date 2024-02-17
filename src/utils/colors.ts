type TextColorTypes = 'dark' | 'light'
type TextColors = {
  [key in TextColorTypes]: string
}

type BaseBackgroundColorTypes = 'white' | 'yellow' | 'blue' | 'green' | 'red'
type BaseBackgroundColors = {
  [key in BaseBackgroundColorTypes]: string
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
  red: '#FFCCCC'
}