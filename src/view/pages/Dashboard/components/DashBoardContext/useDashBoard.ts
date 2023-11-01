import { useContext } from "react";
import { DashBoardContext } from "./DashBoardContext";

export function useDashBoard() {
    return useContext(DashBoardContext);
}
