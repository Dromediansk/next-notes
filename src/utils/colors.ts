type TextColorTypes = 'dark' | 'light'
type TextColors = {
  [key in TextColorTypes]: string
}

const TEXT_COLORS: TextColors = {
  dark: '#333333',
  light: '#f1f5f9'
}

export const getContrastColor = (backgroundColor: string) => {
  // Convert hex color to RGB
  let r = parseInt(backgroundColor.substring(1, 3), 16);
  let g = parseInt(backgroundColor.substring(3, 5), 16);
  let b = parseInt(backgroundColor.substring(5, 7), 16);

  // Calculate the relative luminance
  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Choose light or dark color based on luminance
  return luminance > 0.5 ? TEXT_COLORS.dark : TEXT_COLORS.light;
}

