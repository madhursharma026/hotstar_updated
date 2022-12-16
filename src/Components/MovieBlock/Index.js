import React from "react";
import "../../Homepage/Homepage.css";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const MovieBlock = (props) => {
  const { id, cover, title, description, released, className, style } = props;
  return (
    <div className={`pb-4 ${className} col`} style={style} key={id}>
      <Link to={`/player/${id}`}>
        <div className="video_thumbnail w-100" style={{ backgroundColor: "#0C111B", borderRadius: "10px" }}>
          <LazyLoadImage className="d-block img-fluid imageThumbnail" src={cover} alt="#" width="100%" loading={"lazy"} effect={"blur"} style={{ width: "100%", borderRadius: "10px", objectFit: "cover", backgroundColor: "#0C111B", }} />
          <div className="w-100 px-2 video_description">
            <h6>{title}</h6>
            <p style={{ fontSize: "10px", marginTop: "-5px", maxHeight: "58px", height: "58px !important", overflow: "hidden" }}>
              {released} * {description}
              {description.length >= 80 ? "..." : ""}
            </p>
            <h6 style={{ color: "white", fontSize: "10px" }}>
              <i className="fa fa-play"></i> WATCH MOVIE
            </h6>
          </div>
        </div>
      </Link>
    </div>
  );
};
