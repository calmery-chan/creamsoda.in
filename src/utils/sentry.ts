import Sentry from "@sentry/node";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    beforeSend: (event) => {
      if (process.env.NODE_ENV === "production") {
        return event;
      }

      // Production 環境以外ではエラーの内容をそのまま出力する
      console.error(event);

      return null;
    },
    dsn: process.env.SENTRY_DSN,
  });
}

export { Sentry };
