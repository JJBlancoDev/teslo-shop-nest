export const transformSlug = (value: string): string => {
  return value.toLowerCase().replaceAll(' ', '_').replaceAll("'", '');
};
