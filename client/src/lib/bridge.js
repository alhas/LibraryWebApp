import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import Ajv from 'ajv';

const createBridge = (schema) => {
    const ajv = new Ajv({ allErrors: true, useDefaults: true });

    function createValidator(schema) {
        const validator = ajv.compile(schema);

        return (model) => {
            validator(model);
            return validator.errors?.length ? { details: validator.errors } :null;
        }
    };
    return new JSONSchemaBridge(schema, createValidator(schema));
}

export default createBridge;