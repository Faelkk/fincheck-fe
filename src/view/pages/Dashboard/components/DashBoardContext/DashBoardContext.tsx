import { ReactNode, createContext, useCallback, useState } from "react";

interface DashBoardContextValue {
    areValueVisible: boolean;
    toggleValuesVisiblity: () => void;
}

export const DashBoardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: ReactNode }) {
    const [areValueVisible, setAreValueVisible] = useState(true);

    const toggleValuesVisiblity = useCallback(() => {
        setAreValueVisible((prevState) => !prevState);
    }, []);
    return (
        <DashBoardContext.Provider
            value={{ areValueVisible, toggleValuesVisiblity }}
        >
            {children}
        </DashBoardContext.Provider>
    );
}
