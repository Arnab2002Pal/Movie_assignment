import './App.css';
import { BrowserRouter , Route , Routes} from 'react-router-dom'

import Header from './components/Header';
import Feed from './components/Feed';
import Summary from './components/Summary';

function App() {
  return (
    <BrowserRouter>
     <Header/>
     <Routes>
      <Route path="/" exact element={<Feed />} />
      <Route path="/summary/:name" element={<Summary />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
