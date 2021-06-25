import createBridge from '../lib/bridge'

const SignUpSchema = {

    title: 'Sign UP',
    type: 'object',
    properties: {

        email: { type: 'string' },
        username: { type: 'string' },
        password: {
            type: 'string', label: 'Password',
            uniforms: { type: 'password' },
        },
        passwordCheck: {
            type: 'string', label: 'Password(Again)',
            uniforms: { type: 'password' },
        },
    },
    required: ["username", "password","email"]
}


export const schemaSighUp = createBridge(SignUpSchema);