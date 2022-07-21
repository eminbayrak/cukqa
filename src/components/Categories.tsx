import React from 'react';
import { Select, Stack } from '@chakra-ui/react';

export interface Item {
    label: string;
    value: string;
}
const categories = [
    { value: "general", label: "General" },
    { value: "lifestyle", label: "Life Style" },
    { value: "fashion", label: "Fashion" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "economy", label: "Economy" },
    { value: "sport", label: "Sport" },
    { value: "people", label: "People" },
    { value: "country", label: "Country" },
    { value: "politics", label: "Politics" }
];


const Categories: React.FC = (props: any) => {
    const handleSelectedItemsChange = (e: any) => {
        props.category(e.target.value)
    };
    return (
        <Stack spacing={3}>
            <Select variant='outline' onChange={handleSelectedItemsChange}>
                {categories.map((item: any) =>
                    <option key={item.value} value={item.value}>{item.label}</option>
                )}
            </Select>
        </Stack>
    );
}

export default Categories;