import React, { useEffect } from "react";
import Modal from "./ModalPop";
import LoginForm from "./LoginForm";
import { useTranslation } from "react-i18next";
import useLogin from "../../Hooks/InstaEnroll/useLogin";
import { Player } from "@lottiefiles/react-lottie-player";
import bankFingersAnimation from "../../Assets/login.json";

const Login = () => {
  const { loginUser, errors, errorMessage, showModal, setShowModal } =
    useLogin();

  const { t } = useTranslation();

  return (
    <div className="flex flex-row h-screen bg-color-white">
      <div className="mx-auto my-auto px-4 py-2 sm:w-[40%] md:w-[40%] lg:w-[40%] xl:w-[40%]">
        <div className="flex flex-col items-start mb-10">
          <h1 className="font-roboto font-bold text-4xl text-wrap text-start p-0 sm:p-16 md:p-0 lg:p-0 mt-10 ">
            {t("login_title")}
          </h1>
          <p className="pt-2 text-color-dark-gray text-wrap sm:text-wrap text-start">
            {t("login_subtitle")}
          </p>
        </div>
        <LoginForm onSubmit={loginUser} errors={errors} />
      </div>

      <div className="bg-gradient-to-br from-[#3d78b6] to-[#20205f]  w-[48%] h-[100%] sm:flex flex-col justify-center items-center hidden">
        <h1 className="flex flex-nowrap font-roboto text-4xl font-extrabold mt-28 text-color-white">
          {t("bank_fingers")}
        </h1>
        <Player
          autoplay
          loop
          src={bankFingersAnimation}
          className="w-full h-[100%]"
        />
      </div>

      {showModal && (
        <Modal message={errorMessage} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Login;
