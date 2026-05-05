"use client";

import { Button } from "@heroui/react";
import { LuSearchX } from "react-icons/lu";
import { motion } from "framer-motion";

interface NoResultsProps {
  title: string;
  description: string;
  clearFiltersLabel?: string;
  onClearFilters?: () => void;
  icon?: React.ReactNode;
}

export const NoResults = ({
  title,
  description,
  clearFiltersLabel,
  onClearFilters,
  icon,
}: NoResultsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="mb-6 p-6 bg-gray-200 rounded-full">
        {icon || <LuSearchX size={64} className="text-gray2" />}
      </div>
      <h3 className="text-2xl font-bold text-dark mb-2">{title}</h3>
      <p className="text-gray2 max-w-md mb-8">{description}</p>
      {onClearFilters && clearFiltersLabel && (
        <Button
          color="primary"
          variant="flat"
          radius="full"
          onPress={onClearFilters}
          className="font-semibold h-12 px-8"
        >
          {clearFiltersLabel}
        </Button>
      )}
    </motion.div>
  );
};
