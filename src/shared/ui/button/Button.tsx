import React, { forwardRef } from "react";
import clsx from "clsx";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "primary";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx("btn", `btn-${variant}`, `btn-${size}`, className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
