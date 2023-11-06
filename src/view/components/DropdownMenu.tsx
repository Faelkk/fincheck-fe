import * as RdxDropdown from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { cn } from "../../app/utils/cn";

export const DropdownMenu = ({ children }: { children: ReactNode }) => {
    return <RdxDropdown.Root>{children}</RdxDropdown.Root>;
};

export const DropdownTrigger = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <RdxDropdown.Trigger className={cn("outline-none", className)}>
            {children}
        </RdxDropdown.Trigger>
    );
};

interface DropdownContentProps {
    children: ReactNode;
    className?: string;
}

export const DropdownContent = ({
    children,
    className,
}: DropdownContentProps) => {
    return (
        <RdxDropdown.Portal>
            <RdxDropdown.Content
                className={cn(
                    "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slideUpAndFade data-[side=top]:animate-slideDownAndFade z-[99]",
                    className
                )}
            >
                {children}
            </RdxDropdown.Content>
        </RdxDropdown.Portal>
    );
};

interface DropdownMenuItemProps {
    children: ReactNode;
    clasName?: string;
    onSelect?: () => void;
}

export const DropdownItem = ({
    children,
    clasName,
    onSelect,
}: DropdownMenuItemProps) => {
    return (
        <RdxDropdown.Item
            onSelect={onSelect}
            className={cn(
                "min-h-[40] outline-none flex items-center px-4 py-2 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer",
                clasName
            )}
        >
            {children}
        </RdxDropdown.Item>
    );
};
