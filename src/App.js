
import './App.css';
import ProductPreview from './components/ProductPreview';
import CreateProduct from './components/CreateProduct';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
 


  return (
      <div className='main-container'>
        
        <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<ProductPreview />} />
          <Route exact path='/add-product' element={<CreateProduct />} />
        </Routes>

    </BrowserRouter>
      </div>
    // <div className='main-container'>
    //   <CreateProduct />
    //   <ProductPreview />
    // </div>
  );
}

export default App;
