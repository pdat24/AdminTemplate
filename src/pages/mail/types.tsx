type tagsType =
    | ["personal" | "work" | "payments" | "accounts" | "forums" | "invoices"]
    | ["personal", "work", "payments", "accounts", "forums", "invoices"];
type validTags = "personal" | "work" | "payments" | "accounts" | "forums" | "invoices";
type typeValids = "draft" | "inbox" | "spam" | "trash" | "sent" | "important" | "starred" | { tags: tagsType };
type typeMessage = "draft" | "inbox" | "spam" | "trash" | "sent";
type typeMarked = "important" | "starred";
type selectedTypes = "unStarred" | "starred" | "unImportant" | "important" | "all" | "none";
interface msgType {
    id: string | number;
    avatar?: string;
    type: typeMessage;
    name: string;
    title: string;
    content: string;
    tags: string[];
    starred: boolean;
    important: boolean;
}
export {
    type tagsType,
    type typeValids,
    type msgType,
    type typeMessage,
    type typeMarked,
    type selectedTypes,
    type validTags,
};
