import { useCallback, useState } from "react";
import { ConverterForm } from "./converter-form";
import jsonData from '../appData.json';

export const ConverterContainer = () => {

    const [fieldValues, setFieldValues] = useState<{ [key: string]: any }>(jsonData);

    const onSubmit = useCallback(() => (console.log(fieldValues)), [fieldValues]);

    return (
        <div>
            <ConverterForm jsonData={jsonData} setFieldValues={setFieldValues} />
            <input type="submit" value="Submit" onClick={onSubmit} />
        </div>
    )
};