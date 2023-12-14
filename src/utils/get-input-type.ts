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