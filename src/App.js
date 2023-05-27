
import './App.css';
import ProductPreview from './components/ProductPreview';
import CreateProduct from './components/CreateProduct';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
 


  return (
    <div className='main-container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductPreview />} />
          <Route path='/add-product' element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
