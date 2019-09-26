import React, { useState } from 'react'
import axios from 'axios'
import { Form,Input,TextArea,Button,Image,Message,Header,Icon } from 'semantic-ui-react';
import baseUrl from '../utils/baseUrl';

const INITIAL_PRODUCT={
  name:"",
  price:"",
  media:"",
  description:""
}

function CreateProduct() {
  const [product,setProduct]=useState({INITIAL_PRODUCT});
  const [mediaPreview,setMediaPreview]=useState('');
  const [success,setSuccess] = useState(false);
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true)
    const mediaUrl =await handleImageUpload()
    console.log({mediaUrl})
    const url = `${baseUrl}/api/product`
    const {name,price,description} = product
    const payload={name,price,description,mediaUrl}
    const response = await axios.post(url,payload)
    setLoading(false)
    console.log({response})
    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
  
  }

  const handleChange = event =>{
    const {name,value,files} = event.target
    if(name==='media'){
      setProduct(prevState=>({...prevState,media:files[0]}))
      setMediaPreview(window.URL.createObjectURL(files[0]));
    }else{
    setProduct((prevState)=>({...prevState,[name]:value}))
     
  }
}
const {name,price,description} = product;

  const handleImageUpload= async ()=>{
    const data=new FormData();
    data.append('file',product.media)
    data.append('upload_preset','react_reserve')
    data.append('cloud_name','dme737cmn')
    const response = await axios.post(process.env.CLOUDINARY_URL,data)
    const mediaUrl = response.data.url
    return mediaUrl;
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange"/>
        Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message success icon="check" header="Success!" content="Your Product has been posted" />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            value={name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Price"
            content="Select Image"
            label="Media"
            accept="image/*"
            onChange={handleChange}

          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="medium" />
        <Form.Field
        control={TextArea}
        name="description"
        label="Description"
        placeholder="Description"
        value={description}
        onChange={handleChange}
        />
        <Form.Field
        control={Button}
        disable={loading}
        color="blue"
        icon="pencil alternate"
        content="Submit"
        type="submit"
        />
      </Form>
    </>
  )
}


export default CreateProduct;
