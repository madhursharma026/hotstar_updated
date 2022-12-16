import "./SearchResult.css";
import { Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { MovieBlock } from "../Components/MovieBlock/Index";
import CircularProgress from "@mui/material/CircularProgress";
import { FindMovieByTitleSchema } from "../Schemas/FindMovieByTitle";

function SearchResult() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const gettingUserDetails = useSelector(
    (state) => state.ReduxCommands.LoginDetails
  );
  const SearchWord = JSON.parse(localStorage.getItem("SearchWord"));
  const SearchLine = JSON.parse(localStorage.getItem("Dash-line"));

  const searchWord = useSelector((state) => state.ReduxCommands.SearchInput);
  const { data, error, loading, called } = useQuery(FindMovieByTitleSchema, {
    variables: {
      limit: 40,
      page: 1,
      search: searchWord,
    },
  });

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (data) {
      setSearchData(data?.searchMovieByTitle?.records);
    }
  }, [data]);
  console.log(searchData[0]?.title);
  console.log(data);
  console.log(error);

  if (loading)
    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <CircularProgress sx={{ display: "flex", margin: "auto" }} />
      </div>
    );
  return (
    <div>
      <div className="SearchResult pt-4 mb-5">
        {searchWord && (<h5 className="text-light px-3 px-md-5">Showing all results for{" "} <span style={{ textTransform: "capitalize" }}>{searchWord}</span></h5>)}
        <div className="container-fluid px-md-5">
          {searchData?.length != 0 && !loading && called ? (
            <Box className={"zoom_on_hover"} sx={{ display: "flex", flexWrap: "wrap", height: "100%", gap: "20px", mt: "30px", mb: "35px", justifyContent: "space-left" }}>
              {searchData?.map((element) => (
                <MovieBlock className="searchImageThumbnail"
                  {...{ ...element, style: { display: "block" } }} />
              ))}
            </Box>
          ) : called ? (
            <></>
          ) : (
            <div
              className="container-md text-center mt-5 px-5"
              style={{ height: "100vh", overflow: "hidden" }}
            >
              <ul className="list-group">
                <li className="list-group-item">
                  <h3>No data found</h3>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SearchResult;

