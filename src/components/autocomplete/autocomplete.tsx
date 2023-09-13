import { Autocomplete as AutocompleteBase, TextField } from '@mui/material';
import { FC, useCallback, SyntheticEvent } from 'react';

interface AutocompleteProps {
    label: string;
    options: string[];
    value: string | null;
    onChange?: (value: string | null) => void;
    disabled?: boolean;
}

export const Autocomplete: FC<AutocompleteProps> = ({
    label,
    options,
    value,
    onChange,
    disabled = false,
}) => {
    const changeHandler = useCallback(
        (e: SyntheticEvent, value: string | null) => {
            onChange?.(value);
        },
        [onChange],
    );

    return (
        <AutocompleteBase
            disabled={disabled}
            options={options}
            value={value}
            sx={{
                width: '100%',
            }}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={changeHandler}
        />
    );
};
