import Logo from "../../components/Logo";

import UserMenu from "../../components/UserMenu";
import Accounts from "./components/Accounts/Accounts";
import {
    DashBoardContext,
    DashBoardProvider,
} from "./components/DashBoardContext/DashBoardContext";
import Fab from "./components/Fab/Fab";
import Transactions from "./components/Transactions/Transactions";
import NewTransactionModal from "./modals/NewTransactionModal/NewTransactionModal";
import EditAccountModal from "./modals/EditAccountModal/EditAccountModal";
import NewAccountModal from "./modals/newAccountModal/NewAccountModal";

const Dashboard = () => {
    return (
        <DashBoardProvider>
            <DashBoardContext.Consumer>
                {({ accountBeingEdited }) => (
                    <div className=" h-full w-full p-4  md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4 ">
                        <header className="flex items-center justify-between h-12">
                            <Logo className="h-6 text-teal-900" />
                            <UserMenu />
                        </header>

                        <main className="flex-1 flex flex-col  gap-4 md:flex-row  max-h-full">
                            <div className="w-full  md:w-1/2">
                                <Accounts />
                            </div>

                            <div className="w-full  md:w-1/2">
                                <Transactions />
                            </div>
                        </main>

                        <Fab />
                        <NewAccountModal />
                        <NewTransactionModal />
                        {accountBeingEdited && <EditAccountModal />}
                    </div>
                )}
            </DashBoardContext.Consumer>
        </DashBoardProvider>
    );
};

export default Dashboard;
