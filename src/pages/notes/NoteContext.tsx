import { children } from "~/types";
import { createContext, Dispatch, SetStateAction } from "react";
import { colProp } from "./colNotes";

type valType = Dispatch<SetStateAction<colProp[]>>[] | [];
const Context = createContext<valType>([]);

function NoteContext({ children, value }: children & { value: valType }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context };
export default NoteContext;
