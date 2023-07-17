import { createContext, Dispatch, SetStateAction } from "react";
import { children } from "~/types";
import { msgType } from "./types";

type value = [msgType[], Dispatch<SetStateAction<msgType[]>> | []];
export const Context = createContext<value>([[], []]);

export default function MailContext({ children, value }: children & { value: value }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
}
