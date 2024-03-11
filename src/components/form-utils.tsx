export const getInputType = (value: any) => {
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
