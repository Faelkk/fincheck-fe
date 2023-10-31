import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Router from "./Router/Router";
import { AuthProvider } from "./app/contexts/AuthContext";

const queryClient = new QueryClient();
const App = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Router />
                    <Toaster />
                </AuthProvider>
            </QueryClientProvider>
        </>
    );
};

export default App;
