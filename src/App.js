import Squrl from './components/Squrl';
import Wrapper from './components/Wrapper';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Decrypter from './components/Decrypter';

function App() {
  return (
    <div className='App grid place-items-center h-fit bg-gray-50 dark:bg-gray-900 p-24'>
      <Banner />
        <Wrapper>
          <Squrl />
          <Decrypter />
        </Wrapper>
      <Footer />     
    </div>
  );
}

export default App;
