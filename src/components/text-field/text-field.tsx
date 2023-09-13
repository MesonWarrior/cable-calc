import { TextField as TextFieldBase } from '@mui/material';
import { ChangeEvent, FC, InputHTMLAttributes, useCallback } from 'react';
import { TextFieldVariants } from '@mui/material/TextField/TextField';
import s from './styles.module.scss';

interface TextFieldProps {
    label: string;
    type: InputHTMLAttributes<unknown>['type'];
    onChange?: (value: string) => void;
    value: string;
    readonly?: boolean;
    variant?: TextFieldVariants;
}

export const TextField: FC<TextFieldProps> = ({
    onChange,
    type,
    label,
    value,
    readonly = false,
    variant = 'outlined',
}) => {
    const changeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        },
        [onChange],
    );

    return (
        <div className={s.container}>
            <TextFieldBase
                type={type}
                label={label}
                onChange={changeHandler}
                value={value}
                sx={{
                    width: '100%',
                }}
                InputProps={{
                    readOnly: readonly,
                }}
                variant={variant}
            />
        </div>
    );
};
