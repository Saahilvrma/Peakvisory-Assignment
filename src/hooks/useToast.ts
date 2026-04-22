import { toast } from "sonner";

/**
 * Custom hook for displaying toast notifications
 */
export const useToast = () => {
  return {
    success: (message: string, description?: string) => {
      toast.success(message, {
        description,
        duration: 3000,
      });
    },
    error: (message: string, description?: string) => {
      toast.error(message, {
        description,
        duration: 4000,
      });
    },
    loading: (message: string) => {
      return toast.loading(message);
    },
    promise: <T>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string;
        error: string;
      },
    ) => {
      return toast.promise(promise, messages);
    },
  };
};
