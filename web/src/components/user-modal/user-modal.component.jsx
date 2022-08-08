import Modal from 'react-modal';
import { useState } from 'react'

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

function UserModal() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
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
          value = {"TITLE"}
          handleChange={event => console.log(event.target.value)}
           />
          <FormInput
          label="Description"
          type="text"
          name="description"
          value = {"TITLE"}
          handleChange={event => console.log(event.target.value)}
           />

          <FormInput
          label="Image Url"
          type="text"
          name="imageUrl"
          value = {"TITLE"}
          handleChange={event => console.log(event.target.value)}
           />

           <CustomButton onClick={closeModal} type="submit">Add Product</CustomButton>
        </form>
      </Modal>
    </div>
  );
}

export default UserModal;