import React from "react";
import { useState, useEffect } from "react";
import Airtable from "airtable";
import Modal from "./modal/Modal";
import { Link } from "react-router-dom";

function Home() {
  const [example, setExample] = useState([]);
  const [showModal, setShowModal] = useState('none');

const onModal = ()=>{
showModal === "none"? setShowModal('flex'): setShowModal('none');
}


  useEffect(() => {
    const base = new Airtable({
      apiKey: "keyfr4QOx70y2JmL6",
    }).base("appaWoVoX0pJZEVUT");

    base("tblVLCoN0M4qv66Ov")
      .select({
        view: "viw5c8ACR9vIh0XCx",
      })
      .eachPage(
        function page(example, fetchNextPage) {
          setExample(example);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
          }
        }
      );
  }, []);

  return (
    <div className="home">
      {example.map((item, index) => (
        <div className="card" key={index}>
          <img
            src={item.fields.Images[0].url}
            className="img-fluid "
            alt="..."
          ></img>

          <div className="card-body">
            <h5 className="card-title">{item.fields.Name}</h5>

            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>

            <div className="card-box_color">
              {item.fields.Color.map((item, index) => (
                <p
                  className="card-text card-text_color"
                  style={{ color: item }}
                  key={index}
                >
                  <b> {item}</b>
                </p>
              ))}
            </div>

            <div className="card-box_color">
              <span className="card-type">
                <b>Тип: </b> {item.fields.Type}
              </span>

              <span className="card-cost">
                <b>Вартість: </b> {item.fields.Unitcost},00 .грн
              </span>
            </div>
          </div>
          <Link to="/calc" type="button" className="btn btn-primary" onClick={()=>onModal()}>
            Замовити
          </Link>
        </div>
      ))}

      {/* MODAL */}
    <Modal showModal={showModal} setShowModal={setShowModal} onModal={onModal}></Modal>
    </div>
  );
}

export default Home;
