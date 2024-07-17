import { useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelector("body").style.overflowY = "hidden";
    return () => {
      document.querySelector("body").style.overflowY = "auto";
    };
  }, []);

  const modal = (
    <div className="absolute inset-0 flex flex-col items-center pt-[10vh] bg-secondary-900 bg-opacity-85 ">
      <div className="relative bg-secondary-800 md:px-8 py-8 max-h-[80vh] overflow-y-auto overflow-x-hidden">
        {onClose && (
          <MdClose
            className="absolute top-[5px] right-[5px] text-3xl fill-primary-50 hover:fill-primary-500"
            role="button"
            onClick={onClose}
            title="close"
          />
        )}

        {children}
      </div>
    </div>
  );

  const root = document.getElementById("modal");
  return createPortal(modal, root);
}
