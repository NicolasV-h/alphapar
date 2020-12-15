export default function validateAddClient(values) {
    let errors = {};
    if (!values.clientName) {
        errors.clientName = 'Client name is required';
    }
    if (!values.clientPhone) {
        errors.clientPhone = 'Client phone is required';
    }
    if (!values.clientAddress) {
        errors.clientAddress = 'Client address is required';
    }
    if (!values.clientEmail) {
        errors.clientEmail = 'Client email is required';
    }
    return errors;
};

