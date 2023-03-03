import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "./Form";

function Order({formData, setFormData, showModal, setShowModal}) {
  const { value, windowStyle, typeOption, systemOption, addOption, fullPrice } =
    useSelector((state) => state.modal);

  return (
    <div>
      <h4>
        <i>Ви вибрали </i>
      </h4>
      <span>
        {" "}
        <b>Стиль вікна: </b>
        {windowStyle[0]}
      </span>
      <img src={windowStyle[2]} alt="img"></img>
     
      <p>
        <b>Тип вікна:</b> {typeOption[0]}
      </p>
      <p>
        <b>Система вікна:</b> {systemOption[0]}
      </p>
      <p>
        <b>Додаткові опції:</b> {addOption[0]}
      </p>
      <p>
        <b>Загальна вартість:</b> {fullPrice}.00грн
      </p>
      <h3>Заповніть форму</h3>
      <Form formData={formData} setFormData={setFormData} showModal={showModal} setShowModal={setShowModal}></Form>
    </div>
  );
}

export default Order;
