import logo from "./logo.svg";
import "./scss/main.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import SingleFurniture from "./components/furniture/SingleFurniture";
import Furniture from "./components/furniture/Furniture";
import Designers from "./components/designers/Designers";
import SingleDesigners from "./components/designers/SingleDesigners";
import Slider from "./components/Slider";
import { HashRouter, Routes, Route, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFurniturs,
  setItemFurniture,
} from "../src/components/redux/furnitureSlice";
import Airtable from "airtable";

function App() {
  const dispatch = useDispatch();
  const { furnitur, itemFurniture } = useSelector((state) => state.furniture);



  //записуємо окремо пост через onClick і шукаємо в базі по назві
  //записуємо в LocalStorage
  const onNameFurniture = (name) => {
    const arr = furnitur.filter((item) => item.Name === name);
    dispatch(setItemFurniture(arr[0]));
    localStorage.setItem("count", JSON.stringify(arr[0]));
  };

  

  // записуємо дані з бази даних
  useEffect(() => {
    const base = new Airtable({
      apiKey: "keyfr4QOx70y2JmL6",
    }).base("appaWoVoX0pJZEVUT");

    base("tblVLCoN0M4qv66Ov")
      .select({
        view: "viw4wwiIXJZsh43QF",
      })
      .eachPage(
        function page(furniturs, fetchNextPage) {
          if (furnitur.length < furniturs.length)
            furniturs.map((item) => dispatch(setFurniturs(item.fields)));
            localStorage.setItem("items", JSON.stringify(furniturs));
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
    <div>
      <HashRouter>
        <Header></Header>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route
            path="/furniture"
            element={<Furniture onNameFurniture={onNameFurniture} />}
          />
          <Route
            exact
            path="/furniture/card/:id/"
            element={<SingleFurniture item={itemFurniture}  />}
          />
          <Route path="/designer" element={<Designers />} />
          <Route path="/designer/card/:id" element={<SingleDesigners />} />
          <Route path="/slider" element={<Slider />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
