import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Router from "./Router/Router";
import { AuthProvider } from "./app/contexts/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});
const App = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Router />
                    <Toaster />
                </AuthProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </>
    );
};

export default App;
