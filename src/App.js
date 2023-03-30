import './App.scss';
import {Route} from 'react-router-dom'
import {Routes} from 'react-router-dom'
import Main from './App/page/main/Main'
import Weather from "./App/page/weather/Weather";
import Layout from "./App/componets/Layout/layout";
import Error from "./App/page/Error/Error";
import Weekly from "./App/page/weekly/Weekly"
function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Layout center={true}/>}>
            <Route index element={<Main />}/>
              <Route path="*" element={<Error/>}/>
          </Route>
          <Route path='/' element={<Layout center={false}/>}>
            <Route path='Weather' element={<Weather/>} />
            <Route path='Weekly' element={<Weekly/>} />
          </Route>
      </Routes>
    </div>
  );
}
export default App;
