import { useState, useCallback } from "react";

export type DisclosureProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
};

export const useMultipleDisclosures = <T extends string>(
  keys: readonly T[],
): Record<T, DisclosureProps> => {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    keys.reduce(
      (acc, key) => {
        acc[key] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const getDisclosureProps = useCallback(
    (key: string): DisclosureProps => ({
      isOpen: !!openMap[key],
      onOpen: () => setOpenMap((prev) => ({ ...prev, [key]: true })),
      onClose: () => setOpenMap((prev) => ({ ...prev, [key]: false })),
      onOpenChange: () =>
        setOpenMap((prev) => ({ ...prev, [key]: !prev[key] })),
    }),
    [openMap],
  );

  return keys.reduce(
    (acc, key) => {
      acc[key] = getDisclosureProps(key);
      return acc;
    },
    {} as Record<T, DisclosureProps>,
  );
};
