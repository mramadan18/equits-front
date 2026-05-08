export const useSafeTranslate = (t?: any) => {
  return (key: string | undefined): string => {
    if (!key) return "";
    if (t && key.startsWith("Validation.")) {
      return t(key);
    }
    return key;
  };
};
