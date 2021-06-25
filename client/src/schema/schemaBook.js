import createBridge from '../lib/bridge';

const schemaBook = {

    title: "Book",
    type: "object",
    properties: {
        title: { type: "string" },
        author: { type: "string" },
        language: {
            type: "string",
            enum: ['English', 'Polish', 'Turkish']
        },
        description: { type: "string" },
    },
    required: ["title", "author", "description"]

};

export const book = createBridge(schemaBook)