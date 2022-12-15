import axios from "axios";
import "./SingleCategoryVideo.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Image } from "react-img-placeholder";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingData from "../LoadingData/LoadingData";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "@apollo/client";
import { GenreDetail } from "../Schemas/GenreDetail";
import { MovieBlock } from "../Components/MovieBlock/Index";

function SingleCategoryVideo(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();
  const { category_id } = useParams();
  const gettingUserDetails = useSelector(
    (state) => state.ReduxCommands.LoginDetails
  );

  let [AllItemOfSingleCategory, setAllItemOfSingleCategory] = useState([]);
  let [isNext, isNextFunc] = useState(true);
  let [dataLimit, setdataLimit] = useState(30);
  // let [loading, setloading] = useState(false);

  function fetchMoreData() {
    // alert(dataLimit);
    setdataLimit(dataLimit + 27);
    isNextFunc(false);
    // setAllItemOfSingleCategory((prevState) => {
    // return [...prevState, ...data?.data?.genreDetail?.movies?.records];
    // return [...prevState,];
    // });
    fetchMore({
      variables: {
        // genreId: Number(category_id),
        dataLimit: dataLimit,
      },
    }).then((data) => {
      setAllItemOfSingleCategory((prevState) => {
        // return [...prevState, ...data?.data?.genreDetail?.movies?.records];
        return [...data?.data?.genreDetail?.movies?.records];
      });
      isNextFunc(true);
    });
    // fetchData();
  }

  const { data, loading, error, fetchMore } = useQuery(GenreDetail, {
    variables: {
      genreId: Number(category_id),
      dataLimit: 27,
    },
    skip: !category_id,
  });

  useEffect(() => {
    setAllItemOfSingleCategory(data?.genreDetail?.movies?.records);
  }, [data]);

  error && console.log(error);
  return (
    <>
      {!loading && AllItemOfSingleCategory ? (
        <>
          <div className="SingleCategoryVideo pt-4 mb-5" width={"100%"}>
            {/* <div className="container-fluid px-sm-2"> */}
            <InfiniteScroll style={{ overflow: "hidden" }} dataLength={AllItemOfSingleCategory.length} next={fetchMoreData} hasMore={isNext} loader={
              <div className="text-center pt-5" style={{ overflow: "hidden" }}>
                <div className="spinner-border text-white" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>}>
              {/* <div className="row px-4" style={{ display: "flex", flexWrap: "wrap", marginTop: "30px", alignItems: "start", margin: "30px auto auto auto" }}>
                  {AllItemOfSingleCategory.map((AllItemOfSingleCategory, i) => (
                    <MovieBlock {...AllItemOfSingleCategory} key={AllItemOfSingleCategory.id} style={{ minWidth: "15.7vw", maxWidth: "15.7vw", display: "block" }} />
                  ))}
                </div> */}
              <div className={"row zoom_on_hover px-5"} sx={{ display: "flex", flexWrap: "wrap", height: "100%", gap: "20px", mt: "30px", mb: "35px", justifyContent: "space-left" }}>
                <h5 className="text-light" style={{ fontSize: "24px" }}>
                  Popular Shows
                </h5>
                {AllItemOfSingleCategory?.map((element) => (
                  <MovieBlock
                    {...{ ...element, style: { display: "block", maxWidth: "195px", minWidth: "195px", width: "195px" } }} />
                ))}
              </div>
            </InfiniteScroll>
            {/* </div> */}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ background: "#192133" }}
            className="SingleCategoryVideo px-5 pt-5"
          >
            <LoadingData />
            <LoadingData />
            <LoadingData />
          </div>
        </>
      )}
    </>
  );
}
export default SingleCategoryVideo;
