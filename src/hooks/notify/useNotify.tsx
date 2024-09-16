import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

interface NotificationProps {
  type: "success" | "error";
  message: string;
}
interface wrapperProps {
  type: "success" | "error";
  id: string;
  icon: React.ReactNode;
  message: string;
  onClose: () => void;
}
const Notification = ({ id, icon, message, onClose, type }: wrapperProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      id={id}
      className={`fixed bottom-10 right-4 z-50 flex items-center min-w-[300px] h-[70px] py-4 px-6 text-gray-500 ${
        type == "error" ? "bg-[#ffc2c2]" : "bg-[#c8ffc8]"
      } rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert`}
    >
      <div className="inline-flex items-center justify-cente flex-shrink-0 rounded-lg">{icon}</div>
      <div className={`text-[16px] ${type == "error" ? "text-[#db0d0d]" : "text-[#25bb25]"} mx-5 font-[500]`}>{message}</div>
      <button
        type="button"
        className={`ml-auto mx-1.5 ${
          type == "error" ? "text-[#db0d0d]" : "text-[#25bb25]"
        } rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center w-8 h-8`}
        onClick={onClose}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  );
};

const NotificationWrapper = ({ type, message }: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  const iconColor = type === "success" ? "text-green-500" : "text-red-500";

  return (
    <>
      {visible && (
        <Notification
          id={`toast-${type}`}
          type={type}
          icon={
            type === "success" ? (
              <svg className={`w-8 h-8 ${iconColor}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            ) : (
              <svg className={`w-8 h-8 ${iconColor}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
            )
          }
          message={message}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export const notify = (type: "success" | "error", message: string) => {
  const root = document.createElement("div");
  document.body.appendChild(root);
  const rootElement = createRoot(root);

  rootElement.render(<NotificationWrapper type={type} message={message} />);
};
