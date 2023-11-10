import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../app/hooks/useAuth";
import { DropdownMenu } from "./DropdownMenu";

const UserMenu = () => {
    const { signout, user } = useAuth();
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <div className="bg-teal-50  rounded-full w-12 h-12 flex items-center justify-center border  border-teal-100">
                    <span className="text-sm tracking-[0.5px] text-teal-900">
                        {user?.name.slice(0, 2).toUpperCase()}
                    </span>
                </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="w-32">
                <DropdownMenu.Item
                    className="flex items-center justify-between"
                    onSelect={signout}
                >
                    Sair
                    <ExitIcon className="w-6 h-6" />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default UserMenu;
