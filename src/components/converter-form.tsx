import React, { memo, useCallback } from 'react';
import { StyledDiv, StyledWrapper } from './styles';
import { getInputType } from '../utils';

const getFormField = (value: any, props: {}) => {
    if (getInputType(value) === 'text') {
        return <input type="text" {...props} />
    }
    if (getInputType(value) === 'number') {
        return <input type="number" {...props} />
    }
    if (getInputType(value) === 'checkbox') {
        return <input type="checkbox" {...props} />
    }
    if (Array.isArray(value)) {
        return <textarea cols={30} rows={10} {...props} />
    }
    if (typeof (value) === 'object' && !Array.isArray(value)) {
        return <textarea cols={30} rows={15} {...props} />
    }
    return null;
};

export const ConverterForm = memo(({ setFieldValues, jsonData }: { setFieldValues: any, jsonData: {} }) => {

    const updateFieldValue = useCallback((name: string, value: any) => (setFieldValues((preState: {}) => ({ ...preState, [name]: value }))), [setFieldValues]);

    const onChange = useCallback((e: any) => {
        if (e.target.type === 'number') {
            updateFieldValue(e.target.name, Number(e.target.value))
        }
        else if (e.target.type === 'checkbox') {
            updateFieldValue(e.target.name, Boolean(e.target.checked))
        }
        else {
            updateFieldValue(e.target.name, e.target.value)
        }
    }, [updateFieldValue]);

    const onTextAreaChange = useCallback((e: any) => {
        setFieldValues((preState: {}) => ({ ...preState, [e.target.name]: e.target.value }));
    }, [setFieldValues]);

    const getFieldProps = useCallback((key: string, value: any) => {
        const commonProps = { defaultValue: value, name: key }

        if (typeof (value) === 'boolean') {
            return { defaultChecked: value, name: key, onChange }
        }
        if (typeof (value) === 'object' && !Array.isArray(value)) {
            return { ...commonProps, onChange: onTextAreaChange }
        }
        if (typeof (Array.isArray(value))) {
            return { ...commonProps, onChange: onTextAreaChange }
        }
        return { ...commonProps, onChange }

    }, [onChange, onTextAreaChange]);

    const renderFormItem = useCallback((item: [key: string, value: any]) => {
        const [key, value] = item;
        const fieldProps = getFieldProps(key, value);

        return (
            <StyledDiv key={key}>
                <label htmlFor="item_name">{key}</label>
                {
                    getFormField(value, fieldProps)
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