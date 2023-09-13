import s from './styles.module.scss';
import { Autocomplete } from '../autocomplete/autocomplete';
import { calculatorStore } from '../../stores/calculator-store';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { TextField } from '../text-field/text-field';
import { Button } from '@mui/material';

export const Calculator = observer(() => {
    const groupChangeHandler = useCallback(
        (value: string | null) => {
            calculatorStore.setGroup(value);
        },
        [calculatorStore.setGroup],
    );

    const subGroupChangeHandler = useCallback(
        (value: string | null) => {
            calculatorStore.setSubGroup(value);
        },
        [calculatorStore.setSubGroup],
    );

    const changeLengthHandler = useCallback(
        (value: string) => {
            calculatorStore.setLength(value);
        },
        [calculatorStore.setLength],
    );

    const clickHandler = useCallback(() => {
        calculatorStore.calculate();
    }, [calculatorStore.calculate]);

    return (
        <div className={s.container}>
            <Autocomplete
                label="Группа маркаразмера"
                options={calculatorStore.groupList}
                value={calculatorStore.currentGroup}
                onChange={groupChangeHandler}
            />
            <Autocomplete
                label="Подгруппа маркаразмера"
                options={calculatorStore.subGroupList}
                value={calculatorStore.currentSubGroup}
                onChange={subGroupChangeHandler}
                disabled={calculatorStore.currentGroup === null}
            />
            <TextField
                type="number"
                label="Длина"
                onChange={changeLengthHandler}
                value={calculatorStore.length}
            />
            <TextField
                type="number"
                label="Результат"
                value={calculatorStore.result}
                variant="standard"
            />
            <Button
                className={s.button}
                variant="outlined"
                onClick={clickHandler}
            >
                Расчитать
            </Button>
        </div>
    );
});
