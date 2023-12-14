import React, { memo, useCallback, useState } from 'react';
import { getInputType } from './form-utils';

export const getPrimaryFormField = (value: any, props: {}) => {
    if (getInputType(value) === 'text') {
        return <input type="text" {...props} />
    }
    if (getInputType(value) === 'number') {
        return <input type="number" {...props} />
    }
    if (getInputType(value) === 'checkbox') {
        return <input type="checkbox" {...props} />
    }
    return null;
}

export const CustomField = memo(({ item, setCustomFieldValues }: { item: any, setCustomFieldValues: any }) => {

    const [isEditable, setEditable] = useState<boolean>(false)
    const [key, value] = item;

    const onArrayItemChange = useCallback((e: any) => (
        setCustomFieldValues((preState: {}) => ({
            ...preState,
            [key]: preState[key as keyof typeof preState] ? [...preState[key as keyof typeof preState], e.target.value] : [e.target.value]
        }))
    ), [key, setCustomFieldValues]);

    const onObjectItemChange = useCallback((e: any) => (
        setCustomFieldValues((preState: {}) => ({
            ...preState, [key]: { ...preState[key as keyof typeof preState] as {}, [e.target.name]: e.target.value }
        }))
    ), [key, setCustomFieldValues]);

    const renderArrayItem = useCallback((element: any, index: number) => (
        <React.Fragment key={index}>
            {getPrimaryFormField(element, { defaultValue: element, name: element, onChange: onArrayItemChange })}
        </React.Fragment>
    ), [onArrayItemChange]);

    const renderObjectItem = useCallback((item: any) => {
        const [key, value] = item;
        const commonProps = { name: key, onChange: onObjectItemChange };
        const fieldProps = (typeof (value) === 'boolean') ? { defaultChecked: value, ...commonProps } : { defaultValue: value, ...commonProps };

        return (
            <React.Fragment key={key}>
                <label htmlFor="item_name">{key}</label>
                {
                    getPrimaryFormField(value, fieldProps)
                }
            </React.Fragment>
        );
    }, [onObjectItemChange]);

    const renderForm = useCallback(() => {
        if (Array.isArray(value)) {
            return value.map(renderArrayItem)
        }
        return Object.entries(value).map(renderObjectItem)
    }, [renderArrayItem, renderObjectItem, value]);

    const onClick = useCallback(() => (setEditable(!isEditable)), [isEditable]);

    return (
        <>
            <button onClick={onClick}>Update Fields</button>
            {
                isEditable ? renderForm() : null
            }
        </>
    )

});