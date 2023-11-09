import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import Spinner from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
    isLoading?: boolean;
    variant?: "danger" | "ghost";
}
const Button = ({
    variant,
    className,
    children,
    disabled,
    isLoading,
    ...props
}: ButtonProps) => {
    return (
        <button
            disabled={disabled || isLoading}
            {...props}
            className={cn(
                "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-300 flex items-center justify-center disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl font-medium text-white transition-all",
                variant === "danger" && "bg-red-900 hover:bg-red-800",
                variant === "ghost" &&
                    "bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/5",
                className
            )}
        >
            {!isLoading && children}
            {isLoading && <Spinner className="w-6 h-6" />}
        </button>
    );
};

export default Button;
