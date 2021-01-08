export const resolveControllerPrefix = (prefix?: string) => {
  if (process.env.NODE_ENV === "production") {
    return "a/dream" + (prefix ? `/${prefix}` : "");
  }

  return prefix || "";
};
