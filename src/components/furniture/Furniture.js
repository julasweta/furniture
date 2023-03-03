import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function Furniture({ onNameFurniture }) {

  const { furnitur } = useSelector((state) => state.furniture);


  // лінк для запису в адресний рядок, передаїмо в Link path, а на окремій сторінці витягуємо через useParams
const links = (item)=> {
  return  `/furniture/card/${item.Name.replace(" ", "")}`
};

  return (
    <div className="furniture">
      <h1>Фурнітури:</h1>
      <ul key="card">
        {furnitur.map((item, index) => (
          <li key={index}>
            <div className="card">
              <img src={item.Images[0].url} alt=""></img>
              <div className="card-body">
                <h5 className="card-title">{item.Name}</h5>
                <div className="cut-description">
                  <p className="card-text">
                    {item.Description.slice(0, 75)}...
                  </p>
                </div>
                <p>
                  Розмір: <b>{item.Size}</b>
                </p>
                Тип Використання:
                <ul className="settings">
                  {item.Settings.map((setting, index) => (
                    <li key={index}>
                      <a href="#" aria-label="link">
                        {setting}
                      </a>
                    </li>
                  ))}
                </ul>
                Матеріал:
                <ul className="materials">
                  {item.Materials.map((material, index) => (
                    <li key={index}>
                      <a href="#" aria-label="link">
                        {material}
                      </a>
                    </li>
                  ))}
                </ul>
                <span className="card-price">{item.Unitcost}грн.</span>
                <Link
                  to = {links(item)}
                  className="btn btn-primary"
                  aria-label="link"
                  onClick={()=>onNameFurniture(item.Name)}
                >
                  Детальніше
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Furniture;
