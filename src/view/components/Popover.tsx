import * as RdxPopover from "@radix-ui/react-popover";
import { ReactNode } from "react";
import { cn } from "../../app/utils/cn";

export const PopoverRoot = ({ children }: { children: ReactNode }) => {
    return <RdxPopover.Root>{children}</RdxPopover.Root>;
};

export const PopoverTrigger = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <RdxPopover.Trigger className={cn("outline-none w-full", className)}>
            {children}
        </RdxPopover.Trigger>
    );
};

interface PopoverContentProps {
    children: ReactNode;
    className?: string;
}

export const PopoverContent = ({
    children,
    className,
}: PopoverContentProps) => {
    return (
        <RdxPopover.Portal>
            <RdxPopover.Content
                className={cn(
                    "rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99] p-4",
                    "data-[side=bottom]:animate-slide-up-and-fade",
                    "data-[side=top]:animate-slide-down-and-fade",
                    className
                )}
            >
                {children}
            </RdxPopover.Content>
        </RdxPopover.Portal>
    );
};
