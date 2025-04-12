import { useEffect } from "react";
import { useResumeSelector } from "@/store/hooks";

// Hook to ensure the store is properly loaded
export const useStore = () => {
  const name = useResumeSelector((state) => state.name);
  const isLoaded = Boolean(name);

  useEffect(() => {
    // You can add additional initialization logic here if needed
  }, [isLoaded]);

  return { isLoaded };
};
