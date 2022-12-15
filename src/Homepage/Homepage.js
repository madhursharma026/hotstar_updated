import "./Homepage.css";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import LoadingData from "../LoadingData/LoadingData";
import { homepageSchema } from "../Schemas/HomepageSchema";
import MovieContainer from "../Components/MovieContainer/Index";

function Homepage(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading, setloading] = useState(false);
  const [all_items, setAllItem] = useState([]);

  const { data, error } = useQuery(homepageSchema, {
    variables: {
      limit: 10,
      page: 1,
    },
  });

  error && console.log(error);

  useEffect(() => {
    setloading(false);
    setAllItem(data?.homepage?.records);
    if (data?.homepage?.records) {
      setloading(true);
    }
  }, [data]);

  return (
    <div className="Homepage pt-3">
      {loading && all_items ? (
        <>
          <div className="container-fluid mb-5">
            <div className="mt-3">
              <>
                {all_items?.map((all_item_details) => (
                  <MovieContainer
                    {...all_item_details}
                    key={all_item_details.id}
                  />
                ))}
              </>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="AllCategoryVideo px-5 pt-5">
            <LoadingData />
            <LoadingData />
            <LoadingData />
          </div>
        </>
      )}
    </div>
  );
}
export default Homepage;
