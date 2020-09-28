import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { AxiosError } from "axios";
import { Page } from "../../../components/Page";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { render } from "../../../utils/render";

const SignIn: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaResponse, setRecaptchaResponse] = useState("");

  const handleOnChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setName(event.currentTarget.value),
    []
  );

  const handleOnChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(event.currentTarget.value),
    []
  );

  const handleOnChangeRecaptchaResponse = useCallback((recaptchaResponse) => {
    setRecaptchaResponse(recaptchaResponse);
    setDisabled(false);
  }, []);

  const handleOnClickSignInButton = useCallback(async () => {
    try {
      setDisabled(true);
      await axios.post<null>("/admin", {
        name,
        password,
        "g-recaptcha-response": recaptchaResponse,
        [document
          .querySelector("meta[name='csrf-param']")!
          .getAttribute("content")!]: document
          .querySelector("meta[name='csrf-token']")!
          .getAttribute("content")!,
      });
      window.history.back();
    } catch (error) {
      setErrorMessage((error as AxiosError).message);
    } finally {
      setDisabled(false);
    }
  }, [name, password, recaptchaResponse]);

  useEffect(() => {
    (async () => {
      try {
        await axios.get("/admin");
        window.history.back();
      } catch (_) {} // eslint-disable-line no-empty
    })();
  }, []);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
      <Page>
        <GoogleReCaptcha onVerify={handleOnChangeRecaptchaResponse} />
        <div className="flex justify-center">
          <div className="max-w-sm">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={name}
                  onChange={handleOnChangeName}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  value={password}
                  onChange={handleOnChangePassword}
                />
              </div>
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={handleOnClickSignInButton}
                  className={classNames(
                    "w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                    {
                      "opacity-50 cursor-not-allowed": disabled,
                    }
                  )}
                  disabled={disabled}
                  type="button"
                >
                  Sign In
                </button>
              </div>
              <div className="text-xs text-gray-500">
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-blue-500"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  className="text-blue-500"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </div>
            </form>
            {errorMessage && (
              <p className="text-red-500 text-xs text-center mt-4 italic">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </Page>
    </GoogleReCaptchaProvider>
  );
};

render(SignIn);
