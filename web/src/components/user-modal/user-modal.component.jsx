import Modal from 'react-modal';
import { useState } from 'react'

import { useDispatch, useSelector  } from 'react-redux'
import { addProduct } from '../../redux/features/product.feature'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');




const UserModal = ( ) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [{title,description,imageUrl} , setState ] = useState({title:"",description:"",imageUrl:""});

  const token = useSelector( (state) => state.user.userData.userToken);

const dispatch = useDispatch();

const addNewProduct = () => {
  dispatch(addProduct({ product: {title,description,imageUrl} , token }));
}

const handleChange = ( event ) => {
  const {value,name} = event.target;
  setState( prevState => ({...prevState,[name]:value}));  
}


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    addNewProduct();
    setIsOpen(false);
    
  }

  return (
    <div>
      <button onClick={openModal}>Add Product</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="PRODUCT MODAL"
      >
        <div>Insert Product Details</div>
        <form>
          <FormInput
          label="Title"
          type="text"
          name="title"
          value = {title}
          handleChange={handleChange}
           />


          <FormInput
          label="Description"
          type="text"
          name="description"
          value = {description}
          handleChange={handleChange}
           />

          <FormInput
          label="Image Url"
          type="text"
          name="imageUrl"
          value = {imageUrl}
          handleChange={handleChange}
           />

           <CustomButton onClick={closeModal} type="submit">Add Product</CustomButton>
        </form>
      </Modal>
    </div>
  );
}

export default UserModal;