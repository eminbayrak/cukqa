import { Select, Stack } from '@chakra-ui/react';
import { CategoriesData } from '../data/data';
export interface Item {
    label: string;
    value: string;
}

const Categories = (props: any) => {
    const handleSelectedItemsChange = (e: any) => {
        props.category(e.target.value)
    };
    return (
        <Stack spacing={3}>
            <Select variant='outline' onChange={handleSelectedItemsChange}>
                {CategoriesData?.map(({ value, label }) =>
                    <option key={value} value={value}>{label}</option>
                )}
            </Select>
        </Stack>
    );
}

export default Categories;