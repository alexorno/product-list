import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductPreview = () => {
    const [products, setProducts] = useState([])
    const [checkedProducts, setCheckedProducts] = useState([])
    // const navigate = useNavigate();
    // load products from mySQL on load
    useEffect(() => {
      axios.get('https://productlistalexorno.000webhostapp.com/api/index.php')
      .then(response => {
        setProducts(response.data)
        setCheckedProducts(new Array(response.data.length).fill(false))
    })
    }, [])
    // function to set products which are checked for deletion
    const handleCheckProducts = (i) => {
        const arr = [...checkedProducts];
        arr[i] = !arr[i];
        setCheckedProducts(arr);
    }
    //  HANDLE REMOVE ITEM
    const handleRemove = async() => {
        let indexsId = [];
        checkedProducts.forEach((item, index) => {
            if(item===true){
                indexsId.push(Number(products[index].ID));
            }
        });
        
        if(indexsId.length > 0) {
            // axios.delete('https://productlistalexorno.000webhostapp.com/api/index.php', {data: indexsId})
            await fetch('https://productlistalexorno.000webhostapp.com/api/index.php', {
            method: 'post',
            body: JSON.stringify({ delete: 1,indexsId}),
            })

            window.location.reload(false);
            indexsId = [];
        }else{

        }
    }
    // Converting type and size into readible names
    const typeConvert = (Type, Size) => {
        switch (Type) {
            case 'dvd':
                return `Size: ${Size} MB`;
            case 'furniture':
                return `Dimension: ${Size}`;
            case 'book':
                return `Weight: ${Size}KG`;
            default:
            break
        }
    }

  return (
    <>
    <div className='top-nav'>
        <h1>Product List</h1>

        <div className='buttons'>
            <Link to='/add-product' className='link-button'>
                <button>ADD</button>
            </Link>
            <button id='delete-product-btn' onClick={(e) => handleRemove(e)}>MASS DELETE</button>
        </div>
    </div>
    <div className='products' >
        {/* mapping through products to show on main page */}
        {products?.map((product, index) => (
            <div className='product-preview' key={product.SKU}  onClick={() => handleCheckProducts(index)}>
                <input type='checkbox' className='delete-checkbox' id='delete-checkbox' readOnly checked={checkedProducts[index] } />
                <p>{product.SKU}</p>
                <p>{product.Name}</p>
                <p>{product.Price}$</p>
                <p>{typeConvert(product.Type, product.Size)}</p>
            </div>
        )
        )}
    </div>
    
    </>
  )
}


// const EachProductPreview = ({product, index}) => {
//     const {SKU, Name, Price, Type, Size} = product;

//     const typeConvert = () => {
//         switch (Type) {
//             case 'dvd':
//                 return `Size: ${Size} MB`;
//             case 'furniture':
//                 return `Dimension: ${Size}`;
//             case 'book':
//                 return `Weight: ${Size}KG`;
//             default:
//             break
//         }
//     }

//     return (
        
//     )
// }

export default ProductPreview