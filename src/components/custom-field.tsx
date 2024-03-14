import React, { memo, useCallback, useState } from 'react';
import { getPrimaryFormField } from './form-utils';

const getFieldValue = (e: any) => {
    const { target: { value, checked, type } } = e;
    return (type === 'checkbox') ? checked : value
};

export const CustomField = memo(({ item, setFieldValues }: { item: any, setFieldValues: any }) => {

    const [hidden, setHidden] = useState<boolean>(true)
    const [key, value] = item;

    const onArrayItemChange = useCallback((e: any, index: number) => {
        setFieldValues((preState: {}) => {
            const newArr: any[] = [...preState[key as keyof typeof preState]];
            newArr[index] = getFieldValue(e);
            return {
                ...preState, [key]: newArr
            }
        })
    }, [key, setFieldValues]);

    const onObjectItemChange = useCallback((e: any) => (
        setFieldValues((preState: {}) => ({
            ...preState, [key]: { ...preState[key as keyof typeof preState] as {}, [e.target.name]: getFieldValue(e) }
        }))
    ), [key, setFieldValues]);

    const renderArrayItem = useCallback((element: any, index: number) => (
        <React.Fragment key={index}>
            {getPrimaryFormField(element, { defaultValue: element, name: element, onChange: (e: any) => onArrayItemChange(e, index) })}
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

    const onClick = useCallback(() => (setHidden(!hidden)), [hidden]);

    return (
        <>
            <button onClick={onClick}>Update Fields</button>
            {
                hidden ? null : renderForm()
            }
        </>
    )

});