import React from 'react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { useColorMode } from '@chakra-ui/system';

export interface Item {
    label: string;
    value: string;
}
const countries = [
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

export default function Categories(props: any) {
    const { colorMode, toggleColorMode } = useColorMode();
    const [pickerItems, setPickerItems] = React.useState(countries);
    const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

    const handleCreateItem = (item: Item) => {
        setPickerItems((curr) => [...curr, item]);
        setSelectedItems((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (selectedItems?: Item[]) => {
        if (selectedItems) {
            setSelectedItems(selectedItems);
            const items = selectedItems.map((item: any) => item.value)
            props.category(items)
        }
    };

    return (
        <CUIAutoComplete
            label="Category"
            placeholder=""
            onCreateItem={handleCreateItem}
            items={pickerItems}
            highlightItemBg={colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.200'}
            selectedItems={selectedItems}
            listStyleProps={{ bg: 'transparent' }}
            onSelectedItemsChange={(changes) => {
                handleSelectedItemsChange(changes.selectedItems)
            }}
        />
    );
}