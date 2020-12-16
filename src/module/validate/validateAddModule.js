export default function validateAddModule(values) {
    let errors = {};
    if (!values.planName) {
        errors.planName = 'Le nom du plan est obligatoire';
    }
    return errors;
};

