import { action, computed, makeObservable, observable } from 'mobx';
import weightsJson from '../assets/weights.json';
import { toast } from 'react-toastify';

interface Option {
    name: string;
    value: number | string;
    unit: string;
}

const weights: Record<string, Record<string, Option[]>> = weightsJson;

function isString(value: any): value is String {
    return typeof value === 'string';
}

class CalculatorStore {
    @observable length = '';
    @observable result = '';
    @observable currentGroup: string | null = null;
    @observable currentSubGroup: string | null = null;

    constructor() {
        makeObservable(this);
    }

    @computed get groupList() {
        return Object.keys(weights);
    }

    @computed get subGroupList() {
        return this.currentGroup ? Object.keys(weights[this.currentGroup]) : [];
    }

    calculateResult() {
        if (!this.currentGroup || !this.currentSubGroup) {
            toast('Группа или подгруппа не выбрана.', { type: 'error' });
            return '';
        }

        const options = weights[this.currentGroup][this.currentSubGroup];
        const weight = options.find(
            ({ name }) => name === 'Расчетная масса (вес)',
        )?.value;

        if (weight === undefined || isString(weight)) {
            toast(
                'У выбранного объекта отсутствует характеристика расчетной массы или она приведена не в числовом формате.',
                { type: 'error' },
            );
            return '';
        }

        if (this.length === '') {
            toast('Введите длину.', { type: 'error' });
            return '';
        }

        return (weight * Number(this.length)).toFixed(1);
    }

    @action calculate() {
        this.result = this.calculateResult();
    }

    @action setGroup(group: string | null) {
        this.currentGroup = group;
        this.setSubGroup(null);
    }

    @action setSubGroup(subGroup: string | null) {
        this.currentSubGroup = subGroup;
    }

    @action setLength(length: string) {
        this.length = length;
    }
}

export const calculatorStore = new CalculatorStore();
