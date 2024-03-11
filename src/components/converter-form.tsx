import React, { memo, useCallback } from 'react';
import { StyledDiv, StyledWrapper } from './styles';
import { CustomField } from './custom-field';
import { getPrimaryFormField } from './form-utils';

const getFormField = (item: any, props: {}, setFieldValues: any) => {
    const [key, value] = item;
    if (typeof (value) === 'object') {
        return <CustomField item={item} setFieldValues={setFieldValues} key={key} />
    }
    return getPrimaryFormField(value, props)
};

export const ConverterForm = memo(({ setFieldValues, jsonData }: { setFieldValues: any, jsonData: {} }) => {

    const updateFieldValue = useCallback((name: string, value: any) => (setFieldValues((preState: {}) => ({ ...preState, [name]: value }))), [setFieldValues]);

    const onChange = useCallback((e: any) => {
        if (e.target.type === 'number' || e.target.type === 'text') {
            updateFieldValue(e.target.name, e.target.value)
        }
        if (e.target.type === 'checkbox') {
            updateFieldValue(e.target.name, Boolean(e.target.checked))
        }
    }, [updateFieldValue]);

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
                    getFormField(item, fieldProps, setFieldValues)
                }
            </StyledDiv>
        );
    }, [getFieldProps, setFieldValues]);

    return (
        <StyledWrapper>
            {
                Object.entries(jsonData).map(renderFormItem)
            }
        </StyledWrapper>
    )
});