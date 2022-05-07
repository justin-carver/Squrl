import Squrl from './components/Squrl';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import Footer from './components/Footer';
import Decrypter from './components/Decrypter';
import { useState } from 'react';
import Terms from './components/Terms';

function App() {
    const [termsToggle, setTermsToggle] = useState(false);

    return (
        <div className="App grid place-items-center h-fit bg-gray-50 dark:bg-gray-900">
            {termsToggle ? <Terms termsToggle={setTermsToggle} /> : null}
            <Header />
            <Wrapper>
                <Squrl />
                <Decrypter />
            </Wrapper>
            <Footer termsToggle={setTermsToggle} />
        </div>
    );
}

export default App;
