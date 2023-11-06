import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../app/hooks/useAuth";
import {
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    DropdownMenu,
} from "./DropdownMenu";

const UserMenu = () => {
    const { signout } = useAuth();
    return (
        <DropdownMenu>
            <DropdownTrigger>
                <div className="bg-teal-50  rounded-full w-12 h-12 flex items-center justify-center border  border-teal-100">
                    <span className="text-sm tracking-[0.5px] text-teal-900">
                        RA
                    </span>
                </div>
            </DropdownTrigger>

            <DropdownContent className="w-32">
                <DropdownItem
                    clasName="flex items-center justify-between"
                    onSelect={signout}
                >
                    Sair
                    <ExitIcon className="w-6 h-6" />
                </DropdownItem>
            </DropdownContent>
        </DropdownMenu>
    );
};

export default UserMenu;
