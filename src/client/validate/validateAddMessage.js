export default function validateAddMessage(values) {
    let errors = {};

    if (!values.clientMessage) {
        errors.clientMessage = 'Le message est obligatoire';
    }
    return errors;
};

