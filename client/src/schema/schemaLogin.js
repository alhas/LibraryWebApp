import createBridge from '../lib/bridge';

const loginSchema = {

    title: "Login",
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string",
        uniforms: {type: "password"},
        },

    },
    required:["email","password"]

};

export const bridge = createBridge(loginSchema)