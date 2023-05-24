import axios from 'axios'
import React, { useState, useRef } from 'react';
import {useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();
    const dimensionsForm = useRef();
    const bookForm = useRef();
    const dvdForm = useRef();
    const dimensionHeight = useRef();
    const dimensionLength = useRef();
    const dimensionWidth = useRef();
    const [input, setInput] = useState({type: 'dvd'});
    const [isSKUUnique, setIsSKUUnique] = useState(true)
    

const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(inputs => ({...inputs, [name]: value}))
}

const handleSelectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(inputs => ({...inputs, [name]: value}));

    dvdForm.current.classList.remove('visible');
    dvdForm.current.children[0].removeAttribute('required')

    bookForm.current.classList.remove('visible');
    bookForm.current.children[0].removeAttribute('required')

    dimensionsForm.current.classList.remove('visible');
    const collection = dimensionsForm.current.children;
    for(let i=0; i<collection.length; i++){
        collection[i].removeAttribute('required')
    }

    switch(value){
        case 'dvd':
            dvdForm.current.classList.add('visible');
            dvdForm.current.children[0].setAttribute('required', 'required')
            break;
        case 'book':
            bookForm.current.classList.add('visible');
            bookForm.current.children[0].setAttribute('required', 'required')
            break;
        case 'furniture':
            dimensionsForm.current.classList.add('visible');
            for(let i=0; i<collection.length; i++){
                collection[i].setAttribute('required', 'required')
            }
            break;

        default:
            break;
    }
}

const handleDimensionsChange = () => {
    const converted = `${dimensionHeight.current.value}x${dimensionWidth.current.value}x${dimensionLength.current.value}`
    setInput(inputs => ({...inputs, size: `${converted}`}))
}

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);

    axios.post('https://productlistalexorno.000webhostapp.com/api/index.php', input)
    .then(response => {
        console.log(response)
        if((typeof(response.data) === "string") && (response.data.slice(-5) === `'SKU'`)){
            setIsSKUUnique(false);
        }else{
            navigate('/');
        }
        
    });
}

  return (
     <div className='create-product'>
        

        <form className='create-product-form' id='product_form' onSubmit={(e) => handleSubmit(e)}>
            <div className='top-nav'>
                <h1>Product List</h1>

                <div className='buttons'>
                    <button type='submit'>ADD</button>
                    <button onClick={() => navigate('/')}>CANCEL</button>
                </div>
            </div>

            <div className='input-container'>
                <label>Sku</label>
                <input 
                id='sku' 
                maxLength='64' 
                pattern='[A-Za-z0-9]+'
                // onInvalid={() => alert('In field "SKU" you can only use letters and numbers')}
                required
                className={!isSKUUnique ? `not-unique` : ''}
                name='SKU' 
                placeholder='SKU' 
                onChange={e => handleInputChange(e)}
                />
            </div>
            <div className='input-container'>
                <label>Name</label>
                <input 
                id='name'
                required 
                pattern='[A-Za-z0-9]+'
                // onInvalid={() => alert('In field "Name" you can only use letters and numbers')}
                name='name' 
                placeholder='Name' 
                onChange={e => handleInputChange(e)}
                />
            </div>
            <div className='input-container'>
                <label>Price ($)</label>
                <input id='price' 
                required 
                pattern='/^(\d+(\.\d*)?)|(\.\d+))$/'
                // onInvalid={() => alert('In field "Price" you can only use numbers and dot')}
                name='price' 
                placeholder='Price' 
                onChange={e => handleInputChange(e)}
                />
            </div>
            <div className='input-container'>
                <label>Type switcher</label>
                <select required defaultValue='dvd' name='type' id='productType' onChange={e => handleSelectChange(e)}>
                    <option id='DVD' value="dvd">DVD</option>
                    <option id='Furniture' value="furniture">Furniture</option>
                    <option id='Book' value="book">Book</option> 
                </select>
            </div>
                <div className='dvd-form visible' ref={dvdForm}>
                    <input required name='size' placeholder='Size in MB' onChange={e => handleInputChange(e)}/>
                    <p>Please, provide size of dvd in Megabytes. For example: 6.7MB, 9000MB </p>
                </div>

                <div className='book-form' ref={bookForm}>
                    <input name='size' placeholder='Weight in KG' onChange={e => handleInputChange(e)}/>
                    <p>Please, provide weight of book in Kilograms. For example: 0.7kg, 9.4kg</p>
                </div>

                <div className='dimensions-form' ref={dimensionsForm} >
                    <div className='input-container'>
                        <label>Height (CM)</label>
                        <input name='height' placeholder='height' ref={dimensionHeight}/>
                    </div>
                    <div className='input-container'>
                        <label>Width (CM)</label>
                        <input name='width' placeholder='width' ref={dimensionWidth}/>
                    </div>
                    <div className='input-container'>
                        <label>Length (CM)</label>
                        <input name='length' placeholder='length' ref={dimensionLength} onChange={handleDimensionsChange}/>
                    </div>
                    <p>Please provide dimesions in HxWxL format in cm</p>
                </div>
        </form>
    </div>
  )
}

export default CreateProduct