import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const menu = [
  { name: "HOME", link: "*", id:1 },
  { name: "ФУРНІТУРИ", link: "furniture",id:2  },
  { name: "ДИЗАЙНЕРИ", link: "designer",id:3  },
  { name: "ПОСТАЧАЛЬНИКИ", link: "slider",id:4  },
];

function Header() {
  // активна кнопка
  const [linkActive, setLink] = useState("*");

  // активна кнопка
  const onActive = (link) => {
    setLink(link);
  };

  const hash = window.location.hash.substring(1); // отримуємо рядок без символу '#'
  const parts = hash.split('/'); // розділяємо рядок на частини за допомогою '/'
  const category = parts[1]; // отримуємо категорію меблів
  const itemType = parts[2]; // отримуємо тип меблів
  const itemName = parts[3]; // отримуємо назву меблів

  useEffect(()=>{
    setLink(category);
  }, []);

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {menu.map((item) => (
            <Link
            
            key={item.id}
              to={`/${item.link}`}
              className={
                linkActive === item.link ? "navbar-brand active" : "navbar-brand"
              }
              onClick={() => onActive(item.link)}
            >
              {item.name}{" "}
            </Link>
          ))}

          <form className="d-flex search-form">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Header;
