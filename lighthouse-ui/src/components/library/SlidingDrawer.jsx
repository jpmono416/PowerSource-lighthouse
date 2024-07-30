import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function SlidingDrawer({ doShow, onClose, children }) {
  const [top, setTop] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setTop(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const drawer = (
    <div
      aria-hidden={!doShow}
      className={classNames(
        "absolute right-0 bottom-0 overflow-hidden h-full transition-all",
        {
          "w-full md:w-[50%]": doShow,
          "w-[0]": !doShow,
        }
      )}
      style={{
        top: `${top}px`,
        transition: "width ease 300ms",
      }}
    >
      {children}
      {onClose && doShow && (
        <MdClose
          className="absolute top-[5px] right-[5px] text-3xl fill-primary-50 hover:fill-primary-500"
          role="button"
          onClick={onClose}
          title="close"
        />
      )}
    </div>
  );

  const root = document.getElementById("modal");
  return createPortal(drawer, root);
}
