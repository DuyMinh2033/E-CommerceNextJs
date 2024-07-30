"use client";
import { useWinxClient } from "@/app/hooks/useWinxClient";
import { LoginState } from "@wix/sdk";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const winxClient = useWinxClient();
  const router = useRouter();

  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset your password"
      : "Verify your email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Submit"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const pathName = usePathname();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;
      switch (mode) {
        case MODE.LOGIN:
          response = await winxClient.auth.login({ email, password });
          if (response) {
            toast.success("login success");
          }
          break;
        case MODE.REGISTER:
          response = await winxClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await winxClient.auth.sendPasswordResetEmail({
            email,
            pathName,
          });
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await winxClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          const tokens = await winxClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          winxClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exits");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset password");
          } else {
            setError("something went wrong");
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("Error:", error);
      setError("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-[calc(100vh-80px)] flex justify-center items-center">
      <form
        action=""
        className="bg-gray-100 w-[450px] rounded-xl flex flex-col gap-4 px-3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mt-4 text-[25px] font-medium ">
          {formTitle}
        </h1>
        {mode === MODE.REGISTER ? (
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="" className="text-base font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="outline-none rounded-md p-2 ring-1 h- ring-gray-400 flex-1 "
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="" className="text-base font-medium text-gray-600">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="john@gmail.com"
              // value=""
              className="outline-none rounded-md p-2 ring-1 h- ring-gray-400 flex-1 "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="" className="text-base font-medium text-gray-600">
              Verification Code
            </label>
            <input
              type="text"
              name="emailCode"
              placeholder="Code"
              // value=""
              className="outline-none rounded-md p-2 ring-1  ring-gray-400 flex-1 "
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="" className="text-base font-medium text-gray-600">
              Password
            </label>
            <input
              type="text"
              name="password"
              placeholder="Enter your password"
              // value={}
              className="outline-none rounded-md p-2 ring-1 ring-gray-400 flex-1 "
              onChange={(e) => setPassWord(e.target.value)}
            />
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div className="flex justify-between">
            <span
              className="underline cursor-pointer text-sm text-blue-400"
              onClick={() => setMode(MODE.REGISTER)}
            >
              Don't have an account?
            </span>

            <span
              className="underline cursor-pointer text-sm text-blue-400"
              onClick={() => setMode(MODE.RESET_PASSWORD)}
            >
              Forgot your password?
            </span>
          </div>
        )}
        {error !== "" && (
          <span className="text-red-500 text-center">{error}</span>
        )}
        {mode === MODE.REGISTER && (
          <span
            className="underline cursor-pointer text-sm text-blue-400"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go to back login
          </span>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <span
            className="underline cursor-pointer text-sm text-blue-400"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go to back login
          </span>
        )}
        <div className="w-full flex justify-center mt-2">
          <button
            type="submit"
            className="bg-red-500 px-8 py-3 w-1/2 text-white font-medium rounded-md mb-3 disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : buttonTitle}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
