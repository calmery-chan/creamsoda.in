import * as Sentry from "@sentry/browser";
export * from "@sentry/browser";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  debug: process.env.NODE_ENV !== "production",
});
