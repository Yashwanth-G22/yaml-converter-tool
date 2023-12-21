import { useState } from "react";
import yaml from 'js-yaml';
import { ConverterForm } from "./converter-form";
import jsonData from '../appData.json';

export const ConverterContainer = () => {

    const [fieldValues, setFieldValues] = useState<{ [key: string]: any }>(jsonData);

    function jsonToYaml() {
        console.log('yamlConverter is working')
        try {
            console.log(fieldValues);
            const yamlString = yaml.dump(fieldValues);
            console.log(yamlString);
            return yamlString;
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <ConverterForm jsonData={jsonData} setFieldValues={setFieldValues as any} />
            <input type="submit" value="Submit" onClick={jsonToYaml} />
        </div>
    )
};