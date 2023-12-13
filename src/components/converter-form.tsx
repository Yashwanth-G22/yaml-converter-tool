import { memo, useCallback } from 'react';
import { IITems, formItems } from './items';
import { StyledDiv, StyledWrapper } from './styles';

const getInputType = (value: any) => {
    if (typeof (value) === 'string') {
        return 'text';
    }
    if (typeof (value) === 'boolean') {
        return 'checkbox';
    }
    if (typeof (value) === 'number') {
        return 'number';
    }
};

const getFieldProps = (key: string, value: any) => {
    if (typeof (value) === 'boolean') {
        return { defaultChecked: value, name: key }
    }
    return { defaultValue: value, name: key }
}

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

    const renderFormItem = useCallback((item: [key: string, value: any]) => {
        const [key, value] = item;
        const fieldProps = getFieldProps(key, value);

        return (
            <StyledDiv key={key}>
                <label htmlFor="item_name">{key}</label>
                {
                    typeof (value) === 'object' ? <textarea name={key} cols={30} rows={10} defaultValue={String(value)} onChange={onTextAreaChange}></textarea>
                        : <input type={getInputType(value)} {...fieldProps} onChange={onChange} />
                }
            </StyledDiv>
        );
    }, [onChange, onTextAreaChange]);

    return (
        <StyledWrapper>
            {
                Object.entries(jsonData).map(renderFormItem)
            }
        </StyledWrapper>
    )
});