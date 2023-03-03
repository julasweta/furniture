import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setValue, setWindowStyle, setTypeOption, setSystemOption, setAdd, setFullPrice } from '../redux/modalSlice';
import { Link } from "react-router-dom";

const windows = [
  {
    name: "Глухе вікно",
    koef: 1,
    link: "https://liniavikon.com.ua/images/smart/calc/okno_povorotnoe_otkidnoe.jpg",
  },
  {
    name: "Двійне вікно",
    koef: 2,
    link: "https://liniavikon.com.ua/images/smart/calc/okno_dvuhstvorchatoe_s_povorotno_otkodnoy_stvorkoy.jpg",
  },
  {
    name: "Трійне вікно",
    koef: 3,
    link: "https://liniavikon.com.ua/images/smart/calc/okno_trehstvorchatoe_s_povorotno_otkodnoy_stvorkoy.jpg",
  },
  {
    name: "Чотири вікна",
    koef: 4,
    link: "https://liniavikon.com.ua/images/smart/calc/okno_cheturehstvorchatoe_s_povorotno_otkodnoy_stvorkoy.jpg",
  },
];

const types = [
  { name: "Rehau", koef: 1 },
  { name: "Salamander", koef: 2 },
  { name: "OpenTeck", koef: 3 },
];
const system = [
  { name: "Ecosol60", koef: 1 },
  { name: "Ecosol70", koef: 2 },
  { name: "Synego", koef: 3 },
];
const addStyle = [
  { name: "Підвіконня", price: 400 },
  { name: "Відкоси", price: 200 },
];

function Calculator({onModal}) {
  const dispatch = useDispatch();

  const {value, windowStyle, typeOption, systemOption, addOption, fullPrice}= useSelector(state => state.modal);



  const [active, setActive] = useState(1);

  // ширина, тип вікна, система вікна - записуємо в state
  const valueChange = (event, func, koef) => {
    koef ? dispatch(func([event.target.value, koef])) : dispatch(func(event.target.value));
  
  };

  //яке вікно записуємо в state
  const onChangeWindow = (name, koef, func, link) => {
    dispatch(func([name, koef, link]));
    setActive(koef);
  };

 

  useEffect(() => {
    dispatch(setFullPrice());
  }, [value, windowStyle, typeOption, systemOption, addOption]);

  
  return (
    <div>
      <div className="modal-body">
        <p>
          Компанія «My Windows» пропонує своїм клієнтам тільки найкраще. У нас
          безліч вікон, у яких бути багато переваг. Металопластикове вікно від
          нашої компанії - це не просто надійність і затишок у вашому будинку,
          але і чудовий сервіс, кращі монтажники, заміряють і фахівці відділу
          продажів, які зроблять все, щоб ви залишилися задоволені! Пластикові
          вікна на сьогоднішній день вважаються найпопулярнішими. На віконному
          ринку, можна знайти моделі різних цінових категорій і різновидів.
          Вікна від заводу-виробника «Лінії Вікон» володіють стійкістю до
          температурних коливань, вони зберігають тепло у вашому домі і служать
          довгий-довгий час.
        </p>
      </div>
      <div className="modal-window">
        <div className="modal-window-style">
          <h4>{windowStyle[0]}</h4>
          <ul className="modal-list">
            {windows.map((item, index) => (
              <li key={index}>
                <div>
                  <img
                    src={item.link}
                    onClick={() =>
                      onChangeWindow(item.name, item.koef, setWindowStyle, item.link)
                    }
                    className={active === item.koef? "active-input" : ""}
                  ></img>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="window-type">
          <h4>Тип Вікна</h4>
          <div className="modal-list">
            {types.map((item, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="options"
                  value={item.name}
                  checked={typeOption[0] === item.name}
                  onChange={(e) => valueChange(e, setTypeOption, item.koef)}
                />{" "}
                {item.name}
              </label>
            ))}
          </div>
        </div>

        <div className="window-system">
          <h4>Система</h4>
          <div className="modal-list">
            {system.map((item, index) => (
              <label key={index} className="label">
                <input
                  type="radio"
                  value={item.name}
                  checked={systemOption[0] === item.name}
                  onChange={(e) => valueChange(e, setSystemOption, item.koef)}
                />{" "}
                {item.name}
              </label>
            ))}
          </div>
        </div>

        <div className="window-add">
          <h4>Додаткові послуги</h4>
          <div className="modal-list">
            {addStyle.map((item, index) => (
              <label key={index} className="label">
                <input
                  type="radio"
                  value={item.name}
                  checked={addOption[0] === item.name}
                  onChange={(e) => valueChange(e, setAdd, item.price)}
                />{" "}
                {item.name}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="window-width">
        <span>Ширина вікна</span>
        <input
          type="range"
          min="100"
          max="300"
          value={value}
          onChange={(e) => valueChange(e, setValue)}
        />
        <p>
          Ширина: <b>{value}</b> см.
        </p>
      </div>

      <div className="modal-price">
        <button className="btn btn-danger">{fullPrice}.00грн</button>
      </div>

      <div className="modal-footer">
            <Link to="/order" type="button" className="btn btn-primary" >
              Замовити
            </Link>

            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                onModal();
              }}
            >
              Закрити
            </button>
          </div>

    </div>
  );
}

export default Calculator;
