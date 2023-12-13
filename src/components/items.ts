export interface IITems {
    name: string;
    title: string;
    type: 'Textbox' | 'Toggle' | 'Dropdown' | 'Numberbox'
}

export const formItems: IITems[] = [
    {
        name: 'sample1',
        title: 'Sample1',
        type: 'Textbox'
    },
    {
        name: 'sample2',
        title: 'Sample2',
        type: 'Toggle'
    },
    {
        name: 'sample3',
        title: 'Sample3',
        type: 'Numberbox'
    }
];