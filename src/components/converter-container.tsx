import { useState } from "react";
import { ConverterForm } from "./converter-form";

export const ConverterContainer = () => {

    const [fieldValues, setFieldValues] = useState<{ [key: string]: string }[]>();

    return (
        <div>
            <ConverterForm setFieldValues={setFieldValues as any} />
            <input type="submit" value="Submit" />
        </div>
    )
};