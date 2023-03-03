import React from "react";
import { useState, useEffect } from "react";
import Airtable from "airtable";


// bootstrap-слайдер можна використовувати в інших проектах через підключення bootstrap, для цього тільки змінюємо інформацію в завантаженні  бази даних 
function Slider() {
    // тут знаходиться база даних для слайдера
  const [slider, setSlider] = useState([]); 
  
  // активна кнопка
  const [active, setActive] = useState(0);

  //завантаження з бази даних
  useEffect(() => {
    const base = new Airtable({
      apiKey: "keyfr4QOx70y2JmL6",
    }).base("appaWoVoX0pJZEVUT");

    base("tblYwCoLOR9rq83RC")
      .select({
        view: "viw7BwqGNHcuic3GD",
      })
      .eachPage(
        function page(slider, fetchNextPage) {
          setSlider(slider);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
          }
        }
      );
  }, []);

  // активна кнопка
  const onActive = (index) => {
    setActive(index);
  };



  /* потрібно окремо розмапити кнопки і зображення,
                 вказати перевірку активного класу в кнопках
                          і зображеннях по одинаковому індексу зі state */
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="true"
    >
    
      <div className="carousel-indicators">
         {/* генеруємо кнопки до слайдера  */}
        {slider.map((item, index) => (
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={active === index ? "active" : ""}
            aria-current="true"
            aria-label="Slide {index}"
            key={index}
            onClick={() => setActive(index)}
          ></button>
        ))}
      </div>

      
      <div className="carousel-inner">
         {/* генеруємо зображення до слайдера  */}
        {slider.map((item, index) => (
          <div
            className={
              active === index ? "carousel-item active" : "carousel-item "
            }
            key={index}
          >
            <h2 className="carousel-name">{item.fields.Name}</h2>
            <div className="carousel-img">
              <img
                src={item.fields.Photos[0].url}
                className="d-block"
                alt="img"
              ></img>
            </div>
          </div>
        ))}
      </div>

       {/* кнопки превюшки, залишаємо без зиін, при потребі змінюємо дизайн через css */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slider;
