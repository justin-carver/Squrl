import Squrl from './Components/Squrl';
import Wrapper from './Components/Wrapper';
import Banner from './Components/Banner';
import Footer from './Components/Footer';

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
