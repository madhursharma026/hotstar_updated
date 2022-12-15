import React from "react";
import { Link } from "react-router-dom";
import { MovieBlock } from "../MovieBlock/Index";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const MovieContainer = (all_item_details) => {
  const { height, width } = useWindowDimensions();

  const { handleExtraFetch } = all_item_details;

  let countOfBlock = 2;
  if (width >= 600) countOfBlock = 3;
  if (width >= 800) countOfBlock = 4;
  if (width >= 1000) countOfBlock = 5;
  if (width >= 1200) countOfBlock = 6;
  if (width >= 1600) countOfBlock = 8;

  return (
    <div
      id={`${all_item_details?.name}`.replace(/\s+/g, "")}
      className="carousel slide mx-3"
      data-bs-interval="false"
    >
      <div className="carousel-inner">
        <h4 className="pt-3 px-4">
          <b>
            <Link
              to={`/single_category/${all_item_details?.id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {all_item_details?.name}
            </Link>
          </b>
        </h4>
        <div className="carousel-item zoom_on_hover active">
          <div className="row px-4">
            {all_item_details?.movies?.records
              ?.slice(0, countOfBlock)
              .map((Category_all_item_details, i) => (
                <MovieBlock
                  {...{
                    ...Category_all_item_details,
                    className: `col carousel_item_${i + 1} `,
                  }}
                />
              ))}
          </div>
        </div>
        {all_item_details?.movies?.records.length >= 1 && (
          <div className="carousel-item zoom_on_hover">
            <div className="row px-4">
              {all_item_details?.movies?.records
                ?.slice(countOfBlock, countOfBlock * 2)
                .map((Category_all_item_details, i) => (
                  <MovieBlock
                    {...{
                      ...Category_all_item_details,
                      className: `col carousel_item_${i + 1} `,
                    }}
                  />
                ))}
            </div>
          </div>
        )}
        {all_item_details?.movies?.records.length >= countOfBlock * 3 && (
          <div className="carousel-item zoom_on_hover">
            <div className="row px-4">
              {all_item_details?.movies?.records
                ?.slice(countOfBlock * 2, countOfBlock * 3)
                .map((Category_all_item_details, i) => (
                  <MovieBlock
                    {...{
                      ...Category_all_item_details,
                      className: `col carousel_item_${i + 1} `,
                    }}
                  />
                ))}
            </div>
          </div>
        )}
        {all_item_details?.movies?.records.length >= countOfBlock * 4 && (
          <div className="carousel-item zoom_on_hover">
            <div className="row px-4">
              {all_item_details?.movies?.records
                ?.slice(countOfBlock * 3, countOfBlock * 4)
                .map((Category_all_item_details, i) => (
                  <MovieBlock
                    {...{
                      ...Category_all_item_details,
                      className: `col carousel_item_${i + 1} `,
                    }}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${all_item_details.name}`.replace(/\s+/g, "")}
        data-bs-slide="prev"
        style={{ width: "50px", height: "100%" }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${all_item_details.name}`.replace(/\s+/g, "")}
        data-bs-slide="next"
        style={{ width: "50px", height: "100%" }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default MovieContainer;
