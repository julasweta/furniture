import React, { useState } from 'react';
import { Link } from "react-router-dom";
import validator from "validator";

function Form({showModal, setShowModal}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

const sendForm = () => {
        // перевіряємо, чи всі поля заповнені
        if (!formData.name || !formData.email || !formData.phone) {
          alert("Будь ласка, заповніть всі поля форми");
          return;
        }
    
        // перевіряємо, чи введений коректний номер телефону в Україні
        if (!validator.isMobilePhone(formData.phone, "uk-UA")) {
          alert("Будь ласка, введіть коректний номер телефону в форматі (XXX)XXX-XX-XX");
          return;
        }
    
        // перевіряємо, чи введена коректна поштова адреса
        if (!validator.isEmail(formData.email)) {
          alert("Будь ласка, введіть коректну поштову адресу");
          return;
        }
    
        // відправляємо форму
        console.log("Form data:", formData);
    alert('Дякуємо за замовлення');
    setFormData(  {
      name: '',
      email: '',
      phone: ''
    });
    showModal === "none"? setShowModal('flex'): setShowModal('none');
};

  const handleChange = (event) => {
   setFormData( {
    ...formData,
    [event.target.name]: event.target.value
  });
  };



 

  return (
    <form  className="form form-group">
      <label>
        Name:
        <input type="text" className='form-control' name="name" value={formData.name} onChange={(e)=>handleChange(e)} placeholder="Ім'я" />
      </label>
      <label>
        Email:
        <input type="email" className='form-control' name="email" value={formData.email} onChange={(e)=>handleChange(e)} placeholder="email@gmail"/>
      </label>
      <label>
        Phone:
        <input type="phone" className='form-control' name="phone" value={formData.phone} onChange={(e)=>handleChange(e)} placeholder="(067)000-00-00"/>
      </label>
      <Link to="/order" type="button" className="btn btn-primary" onClick={sendForm}>
            Відправити замовлення
            </Link>
    </form>
  );
}

export default Form;

