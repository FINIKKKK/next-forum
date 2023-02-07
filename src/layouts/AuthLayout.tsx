import React from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: any;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="login">
      <div className="inner block">
        <div className="form">
          <Link href="/">
            <svg className="back" width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#back" />
            </svg>
          </Link>

          {children}
        </div>
      </div>
    </div>
  );
};
