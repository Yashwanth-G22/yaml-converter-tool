import React, { memo, useCallback, useState } from 'react';
import { StyledDiv, StyledWrapper } from './styles';
import { CustomField } from './custom-field';
import { getInputType } from './form-utils';

const getFormField = (item: any, props: {}, setCustomFieldValues: any) => {
    const [key, value] = item;
    if (getInputType(value) === 'text') {
        return <input type="text" {...props} />
    }
    if (getInputType(value) === 'number') {
        return <input type="number" {...props} />
    }
    if (getInputType(value) === 'checkbox') {
        return <input type="checkbox" {...props} />
    }
    return <CustomField item={item} setCustomFieldValues={setCustomFieldValues} key={key} />
};

export const ConverterForm = memo(({ setFieldValues, jsonData }: { setFieldValues: any, jsonData: {} }) => {

    const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: {} }>({});

    const updateFieldValue = useCallback((name: string, value: any) => (setFieldValues((preState: {}) => ({ ...preState, [name]: value }))), [setFieldValues]);

    const onChange = useCallback((e: any) => {
        if (e.target.type === 'number' || e.target.type === 'text') {
            updateFieldValue(e.target.name, e.target.value)
        }
        else if (e.target.type === 'checkbox') {
            updateFieldValue(e.target.name, Boolean(e.target.checked))
        }
        else {
            setFieldValues((preState: {}) => (
                {
                    ...preState,
                    [e.target.name]: customFieldValues[e.target.name]
                }
            ));
        }
    }, [customFieldValues, setFieldValues, updateFieldValue]);

    const getFieldProps = useCallback((key: string, value: any) => (
        (typeof (value) === 'boolean') ? { defaultChecked: value, name: key, onChange } : { defaultValue: value, name: key, onChange }
    ), [onChange]);

    const renderFormItem = useCallback((item: [key: string, value: any]) => {
        const [key, value] = item;
        const fieldProps = getFieldProps(key, value);

        return (
            <StyledDiv key={key}>
                <label htmlFor="item_name">{key}</label>
                {
                    getFormField(item, fieldProps, setCustomFieldValues)
                }
            </StyledDiv>
        );
    }, [getFieldProps]);

    return (
        <StyledWrapper>
            {
                Object.entries(jsonData).map(renderFormItem)
            }
        </StyledWrapper>
    )
});