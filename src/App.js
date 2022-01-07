import Squrl from './components/Squrl';
import Wrapper from './components/Wrapper';
import Banner from './components/Banner';
import Footer from './components/Footer';

function App() {
  return (
    <div className='flex flex-col'>
      <Banner />
      <div className="App grid place-items-center h-screen bg-gray-50 dark:bg-gray-900">
        <Wrapper>
          <Squrl />
        </Wrapper>
        <Footer />     
      </div>
    </div>
  );
}

export default App;
