import React from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  handler: React.Dispatch<React.SetStateAction<boolean>>
) => {
  React.useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) {
        handler(false);
      }
    };

    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);
};
