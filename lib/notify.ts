import { toast } from "sonner";

type NotifyOptions = {
  description?: string;
  testId?: string;
};

function resolveNotifyOptions(
  descriptionOrOptions?: string | NotifyOptions,
): NotifyOptions | undefined {
  if (typeof descriptionOrOptions === "string") {
    return { description: descriptionOrOptions };
  }

  return descriptionOrOptions;
}

export const notify = {
  success: (message: string, descriptionOrOptions?: string | NotifyOptions) => {
    const options = resolveNotifyOptions(descriptionOrOptions);
    return toast.success(message, {
      description: options?.description,
      testId: options?.testId,
    });
  },
  error: (message: string, descriptionOrOptions?: string | NotifyOptions) => {
    const options = resolveNotifyOptions(descriptionOrOptions);
    return toast.error(message, {
      description: options?.description,
      testId: options?.testId,
    });
  },
};
