import s from './styles.module.scss';
import { Calculator } from '../../components/calculator/calculator';

export const CalculatorPage = () => {
    return (
        <div className={s.page}>
            <Calculator />
        </div>
    );
};
