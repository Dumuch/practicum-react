import {ChangeEvent, useState} from "react";

export const UseForm = <T>(initValues: Record<keyof T, string>) => {
    const [values, setValues] = useState(initValues as T);
    const onChange = (name: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
        const newValues = {...values, [name]: e.currentTarget.value};
        setValues(newValues)
    }

    return {
        values,
        onChange
    }
}