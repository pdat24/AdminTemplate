interface colProp {
    title: string;
    content: string;
    items: { completed: number; text: string }[];
    tags: Array<labelsType>;
    type: noteType;
}
type noteType = "archive" | "reminder" | "note";
type labelsType = "friends" | "personal" | "priority" | "tasks" | "work" | "family";
const col1Note: colProp[] = [
    { title: "", content: "Find a new company name", items: [], tags: ["work"], type: "note" },
    {
        title: "Gift Ideas",
        content:
            "Stephanie's birthday is coming and I need to pick a present for her. Take a look at the below list and buy one of them (or all of them)",
        items: [
            { completed: 0, text: "Scarf" },
            { completed: 1, text: "A new bike helmet" },
            { completed: 0, text: "Necklace" },
            { completed: 0, text: "Flowers" },
        ],
        tags: ["family"],
        type: "note",
    },
    { title: "", content: "Plan the road trip", items: [], tags: ["friends", "work"], type: "note" },
    { title: "", content: "Theming support for all apps", items: [], tags: ["work"], type: "reminder" },
    { title: "", content: "Re-fill the medicine cabinet", items: [], tags: ["priority", "personal"], type: "archive" },
    {
        title: "Tasks",
        content: "",
        items: [
            { completed: 1, text: "Walk the dog" },
            { completed: 0, text: "Wash the dishes" },
        ],
        tags: ["priority"],
        type: "reminder",
    },
];
const col2Note: colProp[] = [
    {
        title: "",
        content: "Send the photos of last summer to John",
        items: [],
        tags: ["work", "personal"],
        type: "note",
    },
    {
        title: "Team Meeting",
        content: "Talk about the future of the web apps",
        items: [],
        tags: ["work", "tasks"],
        type: "archive",
    },
    {
        title: "Shopping list",
        content: "",
        items: [
            { completed: 1, text: "Bread" },
            { completed: 0, text: "Milk" },
            { completed: 0, text: "Onions" },
            { completed: 1, text: "Coffee" },
            { completed: 1, text: "Toilet Paper" },
        ],
        tags: ["tasks"],
        type: "note",
    },
    {
        title: "Shopping list",
        content: "",
        items: [
            { completed: 1, text: "Bread" },
            { completed: 0, text: "Milk" },
            { completed: 0, text: "Onions" },
            { completed: 1, text: "Coffee" },
            { completed: 1, text: "Toilet Paper" },
        ],
        tags: ["tasks"],
        type: "reminder",
    },
    { title: "Office Address", content: "933 8th Street Stamford, CT 06902", items: [], tags: ["work"], type: "note" },
];
const col3Note: colProp[] = [
    { title: "", content: "Update the design of the theme", items: [], tags: ["priority"], type: "note" },
    {
        title: "Tasks",
        content: "",
        items: [
            { completed: 1, text: "Walk the dog" },
            { completed: 0, text: "Wash the dishes" },
        ],
        tags: ["priority"],
        type: "note",
    },
    {
        title: "Keynote Schedule",
        content: "",
        items: [
            { completed: 1, text: "Breakfast" },
            { completed: 1, text: "Opening ceremony" },
            { completed: 1, text: "Talk 1: How we did it!" },
            { completed: 0, text: "Talk 2: How can you do it!" },
            { completed: 0, text: "Lunch break" },
        ],
        tags: ["tasks", "work"],
        type: "note",
    },
    {
        title: "Keynote Schedule",
        content: "",
        items: [
            { completed: 1, text: "Breakfast" },
            { completed: 1, text: "Opening ceremony" },
            { completed: 1, text: "Talk 1: How we did it!" },
            { completed: 0, text: "Talk 2: How can you do it!" },
            { completed: 0, text: "Lunch break" },
        ],
        tags: ["tasks", "work"],
        type: "reminder",
    },
];
const col4Note: colProp[] = [
    { title: "", content: "Theming support for all apps", items: [], tags: ["priority"], type: "note" },
    { title: "", content: "Organize the dad's surprise retirement party", items: [], tags: ["priority"], type: "note" },
    {
        title: "",
        content: "Organize the dad's surprise retirement party",
        items: [],
        tags: ["priority"],
        type: "reminder",
    },
    { title: "", content: "Dinner with parents", items: [], tags: ["priority"], type: "note" },
];

export { col1Note, col2Note, col3Note, col4Note, type colProp, type noteType, type labelsType };
