
import './App.css';
import ProductPreview from './components/ProductPreview';
import CreateProduct from './components/CreateProduct';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

function App() {
 


  return (
  <DocumentTitle title={'ProductList of Alexorno'}>
    <div className='main-container'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<ProductPreview />} />
          <Route exact path='/add-product' element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  </DocumentTitle>
  );
}

export default App;
