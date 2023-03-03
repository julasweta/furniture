import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItemDesigner } from "../redux/designerSlice";

import { useParams} from 'react-router-dom';

function SingleDisegners() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { itemDesigner } = useSelector((state) => state.designer);
  const itemLocalDesigner = JSON.parse(
    localStorage.getItem("itemLocalDesigner")
  );
  const designersLocal = JSON.parse(localStorage.getItem("designersLocal"));

  const setBrowserLink = (name) => {
    const arr = designersLocal.filter(
      (item) => item.fields.Name.replace(" ", "") === name
    );
    dispatch(setItemDesigner(arr[0].fields));
  };

  useEffect(() => {
    setBrowserLink(id);
  }, [id]);



  return (
    <div className="single-designer">
      <div className="card">
        <img
          src={
            Object.keys(itemDesigner).length !== 0
              ? itemDesigner.Photo[0].url
              : itemLocalDesigner.Photo[0].url
          }
          alt="img"
          width={500}
        ></img>
        <div className="card-body">
          <h3 className="card-title">
            {Object.keys(itemDesigner).length !== 0
              ? itemDesigner.Name
              : itemLocalDesigner.Name}
          </h3>
          <div className="cut-description">
            <p className="card-text">
              {Object.keys(itemDesigner).length !== 0
                ? itemDesigner.Bio
                : itemLocalDesigner.Bio}
              ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleDisegners;
