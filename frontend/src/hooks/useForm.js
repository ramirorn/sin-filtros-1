import { useState } from "react";

export const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleReset = () => {
        setValues(initialValues);
    };

    return {
        values,
        handleChange,
        handleReset,
        setValues
    }
};