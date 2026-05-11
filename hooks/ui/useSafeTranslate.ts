export const useSafeTranslate = (t?: any) => {
  return (key: string | undefined): string => {
    if (!key) return "";
    if (
      t &&
      (key.startsWith("Validation.") || key.startsWith("requestMeetingModal."))
    ) {
      return t(key);
    }
    return key;
  };
};
