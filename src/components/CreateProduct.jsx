// import axios from 'axios'
import React, { useState, useRef } from 'react';
import {useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();
    // refs for handling whether to show or to hide them during select 
    const dimensionsForm = useRef();
    const bookForm = useRef();
    const dvdForm = useRef();
    const dimensionHeight = useRef();
    const dimensionLength = useRef();
    const dimensionWidth = useRef();
    const [input, setInput] = useState({type: 'dvd'});
    const [isSKUUnique, setIsSKUUnique] = useState(true)
    
// adding to array key(name of input): 'value of input'
const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(inputs => ({...inputs, [name]: value}))
}
// handling which select option is selected and showing it and hiding other form 
const handleSelectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(inputs => ({...inputs, [name]: value}));

    dvdForm.current.classList.remove('visible');
    dvdForm.current.children[0].removeAttribute('required');
    dvdForm.current.children[0].removeAttribute('id')

    bookForm.current.classList.remove('visible');
    bookForm.current.children[0].removeAttribute('required')
    bookForm.current.children[0].removeAttribute('id')

    dimensionsForm.current.classList.remove('visible');
    dimensionHeight.current.removeAttribute('required')
    dimensionLength.current.removeAttribute('required')
    dimensionWidth.current.removeAttribute('required')
    

    switch(value){
        case 'dvd':
            dvdForm.current.classList.add('visible');
            dvdForm.current.children[0].setAttribute('required', 'required')
            dvdForm.current.children[0].setAttribute('id', 'size')
            break;
        case 'book':
            bookForm.current.classList.add('visible');
            bookForm.current.children[0].setAttribute('required', 'required')
            bookForm.current.children[0].setAttribute('id', 'weight')
            break;
        case 'furniture':
            dimensionsForm.current.classList.add('visible');
            dimensionHeight.current.setAttribute('required', 'required')
            dimensionLength.current.setAttribute('required', 'required')
            dimensionWidth.current.setAttribute('required', 'required')
            break;

        default:
            break;
    }
}
// converting entered dimensions into size object
const handleDimensionsChange = () => {
    const converted = `${dimensionHeight.current.value}x${dimensionWidth.current.value}x${dimensionLength.current.value}`
    setInput(inputs => ({...inputs, size: `${converted}`}))
}
// handle data which is submitted and then navigate to main page if sku is unique(axios is changed to detch deu 00webhost not working with axios.post)
const handleSubmit = async(e) => {
    e.preventDefault();
    // axios.post('https://productlistalexorno.000webhostapp.com/api/index.php', input)
    const submitData = await fetch('https://productlistalexorno.000webhostapp.com/api/index.php', {
    method: 'post',
    body: JSON.stringify(input),
    });
    // getting response from fetch
    const data = await submitData.text();
    
        if(data.slice(-5) === `'SKU'`){
            setIsSKUUnique(false);
        }else{
            navigate('/');
        }
}

  return (
     <div className='create-product'>
        

        <form className='create-product-form' id='product_form'  onSubmit={(e) => handleSubmit(e)}>
            <div className='top-nav'>
                <h1>Product List</h1>

                <div className='buttons'>
                    <button name='Save' type='submit'>Save</button>
                    <button onClick={() => navigate('/')}>CANCEL</button>
                </div>
            </div>
        
            <div className={!isSKUUnique ? `input-container not-unique` : 'input-container'}>
                <label>Sku</label>
                <input 
                id='sku'
                pattern='^[A-Za-z0-9]+$'
                onInvalid={() => alert('In field "SKU" you can only use letters and numbers')}
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
                pattern='^[A-Za-z0-9 ]+$'
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
                // pattern='/^(\d+(\.\d*)?)|(\.\d+))$/'
                onInvalid={() => alert('In field "Price" you can only use numbers and dot')}
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
                    <input required id='size' name='size' placeholder='Size in MB' onChange={e => handleInputChange(e)}/>
                    <p>Please, provide size of dvd in Megabytes. For example: 6.7MB, 9000MB </p>
                </div>

                <div className='book-form' ref={bookForm}>
                    <input name='size' placeholder='Weight in KG' onChange={e => handleInputChange(e)}/>
                    <p>Please, provide weight of book in Kilograms. For example: 0.7kg, 9.4kg</p>
                </div>

                <div className='dimensions-form' ref={dimensionsForm} >
                    <div className='input-container'>
                        <label>Height (CM)</label>
                        <input id='height' name='height' placeholder='height' ref={dimensionHeight} onChange={handleDimensionsChange}/>
                    </div>
                    <div className='input-container'>
                        <label>Width (CM)</label>
                        <input id='width' name='width' placeholder='width' ref={dimensionWidth} onChange={handleDimensionsChange}/>
                    </div>
                    <div className='input-container'>
                        <label>Length (CM)</label>
                        <input id='length' name='length' placeholder='length' ref={dimensionLength} onChange={handleDimensionsChange}/>
                    </div>
                    <p>Please provide dimesions in HxWxL format in cm</p>
                </div>
        </form>
    </div>
  )
}

export default CreateProduct