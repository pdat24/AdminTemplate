import { ReactNode } from "react";

interface children {
    children?: ReactNode;
}

type bunchChat = { 0?: string[]; 1?: string[] };
type chat = Array<{ 0?: string[] } | { 1?: string[] }>;

interface friend {
    id: number;
    avatar: string;
    state: string;
    chat: chat;
    name: string;
}

export { type children, type friend, type chat, type bunchChat };
