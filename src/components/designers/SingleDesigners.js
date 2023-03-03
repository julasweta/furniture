import React from 'react';
import { useSelector, useDispatch } from "react-redux";

function SingleDisegners() {
  const { itemDesigner } = useSelector((state) => state.designer);
  const itemLocalDesigner = JSON.parse(localStorage.getItem("itemLocalDesigner"));
  console.log(itemLocalDesigner);

  return (
    <div className='single-designer'>
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
  )
}

export default SingleDisegners;
