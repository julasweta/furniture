import React from "react";
import { useState, useEffect } from "react";
import Airtable from "airtable";
import { Link } from "react-router-dom";
import {setItemDesigner} from "../redux/designerSlice";
import { useDispatch } from "react-redux";

function Designers() {
  const dispatch = useDispatch();
  const [disegners, setDisegners] = useState([]);

  useEffect(() => {
    const base = new Airtable({
      apiKey: "keyfr4QOx70y2JmL6",
    }).base("appaWoVoX0pJZEVUT");

    base("tblsN8fwzgD4XehTk")
      .select({
        view: "viwjhJrgO8LLZq2Yi",
      })
      .eachPage(
        function page(disegners, fetchNextPage) {
            setDisegners(disegners);
            localStorage.setItem("designersLocal", JSON.stringify(disegners));
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
          }
        }
      );
  }, []);


   // лінк для запису в адресний рядок, передаїмо в Link path, а на окремій сторінці витягуємо через useParams
const links = (item)=> {
  return  `/designer/card/${item.Name.replace(" ", "")}`
};

const onItemDesigner = (item) => {
dispatch(setItemDesigner(item));
}

  return (
    <div className="furniture">
      <h1>Дизайнери:</h1>
      <ul key="card">
        {disegners.map((item) => (
          <li key={item.id}>
            <div className="card">
              <img src={item.fields.Photo[0].url} alt=""></img>
              <div className="card-body">
                <h5 className="card-title">{item.fields.Name}</h5>
                <div className="cut-description">
                  <p className="card-text">{item.fields.Bio.slice(0, 75)}...</p>
                </div>
                <p>
                  Розмір: <b>{item.fields.Size}</b>
                </p>
              
                <Link to={links(item.fields)} className="btn btn-primary" aria-label="link" onClick={()=> onItemDesigner(item.fields)}>
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

export default Designers;
