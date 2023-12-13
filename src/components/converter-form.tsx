import { memo, useCallback } from 'react';
import { IITems, formItems } from './items';

const getInputType = (type: IITems['type']) => {
    if (type === 'Textbox') {
        return 'text';
    }
    if (type === 'Toggle') {
        return 'checkbox'
    }
    if (type === 'Numberbox') {
        return 'number'
    }
};

export const ConverterForm = memo(({ setFieldValues }: { setFieldValues: () => void }) => {

    const renderFormItem = useCallback((item: IITems) => {
        const { name, title, type } = item;

        return (
            <div key={name}>
                <label htmlFor="item_name">{title}</label>
                <input type={getInputType(type)} />
            </div>
        );
    }, []);

    return (
        <>
            {
                formItems.map(renderFormItem)
            }
        </>
    )
});