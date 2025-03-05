import React from "react";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-color-dark-gray bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-color-white rounded p-6 w-1/3 ">
        <h2 className="font-roboto text-xl font-bold mb-4">Login Error</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-color-red text-color-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
