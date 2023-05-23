import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductPreview = () => {
    const [products, setProducts] = useState([])
    const [checkedProducts, setCheckedProducts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
      axios.get('http://productlistalexorno.000webhostapp.com/api/index.php')
      .then(response => {
        setProducts(response.data)
        setCheckedProducts(new Array(response.data.length).fill(false))
    })
    }, [])

    console.log(checkedProducts)
    const handleCheckProducts = (i) => {
        const arr = [...checkedProducts];
        arr[i] = !arr[i];
        setCheckedProducts(arr);
    }
//  HANDLE REMOVE 
    const handleRemove = () => {
        let indexsId = [];
        checkedProducts.forEach((item, index) => {
            if(item===true){
                indexsId.push(Number(products[index].ID));
            }
        });

        console.log(indexsId)
        if(indexsId.length > 0) {
            axios.delete('http://productlistalexorno.000webhostapp.com/api/index.php', {data: indexsId})
            .then(response => {
                console.log(response.data);
                window.location.reload(false);
                indexsId = [];
                }
            )
        }else{

        }
    }

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
            <button onClick={() => navigate('/add-product')}>ADD</button>
            <button id='delete-product-btn' onClick={() => handleRemove()}>MASS DELETE</button>
        </div>
    </div>
    <div className='products' >
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