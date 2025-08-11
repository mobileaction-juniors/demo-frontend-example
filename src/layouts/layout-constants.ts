export const LAYOUT = {
    DEFAULT: 'default',
  } as const;
  
  export type LayoutName = typeof LAYOUT[keyof typeof LAYOUT];