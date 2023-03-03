import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setItemFurniture } from "../redux/furnitureSlice";

function SingleFurniture({}) {
  const { itemFurniture, furnitur } = useSelector((state) => state.furniture);
  const dispatch = useDispatch();
  const { id } = useParams();

  const gg = JSON.parse(localStorage.getItem("count"));
  const gb = JSON.parse(localStorage.getItem("items"));

  //записуємо окремо пост через onClick і шукаємо в базі по назві
  //записуємо в LocalStorage
  const onNameLink = (name) => {
    const arr = gb.filter((item) => item.fields.Name.replace(" ", "") === name);
    dispatch(setItemFurniture(arr[0].fields));
    localStorage.setItem("count", JSON.stringify(arr[0].fields));
  };

  useEffect(() => {
    onNameLink(id);
  }, [id]);

  return (
    <div className="single-page">
      {" "}
      <div className="card">
        <img
          src={
            Object.keys(itemFurniture).length !== 0
              ? itemFurniture.Images[0].url
              : gg.Images[0].url
          }
          alt="img"
          width={500}
        ></img>
        <div className="card-body">
          <h3 className="card-title">
            {Object.keys(itemFurniture).length !== 0
              ? itemFurniture.Name
              : gg.Name}
          </h3>
          <div className="cut-description">
            <p className="card-text">
              {Object.keys(itemFurniture).length !== 0
                ? itemFurniture.Description
                : gg.Description}
              ...
            </p>
          </div>
          <p>
            Розмір:{" "}
            <b>
              {Object.keys(itemFurniture).length !== 0
                ? itemFurniture.Size
                : gg.Size}
            </b>
          </p>
          Тип Використання:
          <ul className="settings">
            {Object.keys(itemFurniture).length !== 0
              ? itemFurniture.Settings.map((setting, index) => (
                  <li key={index}>
                    <a href="#" aria-label="link">
                      {setting}
                    </a>
                  </li>
                ))
              : gg.Settings.map((setting, index) => (
                  <li key={index}>
                    <a href="#" aria-label="link">
                      {setting}
                    </a>
                  </li>
                ))}
          </ul>
          <span className="card-price">
            <b>
              {Object.keys(itemFurniture).length !== 0
                ? itemFurniture.Unitcost
                : gg.Unitcost}
              грн.
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleFurniture;
