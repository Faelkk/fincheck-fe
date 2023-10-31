import { useAuth } from "../../../app/hooks/useAuth";
import Button from "../../components/Button";

const Dashboard = () => {
    const { signout } = useAuth();
    return (
        <div>
            <Button onClick={signout}>Sair</Button>
        </div>
    );
};

export default Dashboard;
