import Squrl from './Components/Squrl';
import Wrapper from './Components/Wrapper';
import Banner from './Components/Banner';

function App() {
  return (
    <>
      <Banner />
      <div className="App grid place-items-center h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <Wrapper>
          <Squrl />
        </Wrapper>     
      </div>
    </>
  );
}

export default App;
