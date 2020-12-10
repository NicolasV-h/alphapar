export default function validate(values) {
    let errors = {};
    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be 8 or more characters';
    }
    if (!values.clientName) {
        errors.clientName = 'Client name is required';
    }
    if (!values.planQuantity) {
        errors.planQuantity = 'Plan quantity is required';
    }else if(!Number.isInteger(values.planQuantity)){
        errors.planQuantity = 'Plan quantity is invalid';
    }

    return errors;
};
