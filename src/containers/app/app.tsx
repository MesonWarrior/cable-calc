import { CalculatorPage } from '../calculator-page/calculator-page';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div>
            <CalculatorPage />
            <ToastContainer />
        </div>
    );
}

export default App;
