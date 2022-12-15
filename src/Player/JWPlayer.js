import "./VideoPlayer.css";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ReactJWPlayer from "react-jw-player";
import { useParams } from "react-router-dom";
import { Image } from "react-img-placeholder";
import Trailers from "../TrailersPlayer/Trailers";
import React, { useState, useEffect } from "react";
import { FindMovieByIdSchema } from "../Schemas/FindMovieById";
import LoadingDataForSingleVideoPage from "../LoadingData/LoadingDataForSingleVideoPage";

function JWPlayer(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { single_video_id } = useParams();
  const [TrailersData, setTrailersData] = useState([]);
  const [SingleVideoDetails, setSingleVideoDetails] = useState([]);

  const { data, error, loading } = useQuery(FindMovieByIdSchema, {
    variables: {
      movieId: Number(single_video_id),
    },
    skip: !single_video_id,
  });
  console.log(data);
  console.log(Number(single_video_id));
  console.log(error);
  console.log(JSON.stringify(error, null, 2));
  useEffect(() => {
    if (data) {
      setSingleVideoDetails(data?.findMovieById);
      setTrailersData(data?.findMovieById);
    }
  }, [data]);

  console.log(SingleVideoDetails);
  const url = SingleVideoDetails?.files?.[0]?.download_url.replace("_hevc", "");
  console.log("url: ", url);

  return (
    <>
      {!loading ? (
        <>
          <>
            <div
              className="VideoPlayer"
              style={{ minHeight: "30rem" }}
            >
              {url && (
                <ReactJWPlayer playerId={SingleVideoDetails.id} playerScript="https://content.jwplatform.com/libraries/tqjyvT9W.js" file={url} image={SingleVideoDetails.cover} aspectRatio="22:9" customProps={{ playbackRateControls: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2], cast: {} }} />
              )}
              <div className="px-sm-5 px-3">
                <h3 className="text-white mt-3"><b>{SingleVideoDetails?.title}</b></h3>
                <h5 className="text-white" style={{ fontSize: "16px" }}>
                  <span style={{ color: "rgba(236,231,231,0.65)", fontWeight: "600" }}>{SingleVideoDetails.released}</span>{" "} * <span className="text-primary"><b>{SingleVideoDetails?.tags}</b></span>
                </h5>
                <h5 style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)" }}>
                  {SingleVideoDetails?.description}
                </h5>
                <Trailers TrailersData={TrailersData} />
                {SingleVideoDetails.files?.length !== 1 ? (
                  <>
                    <h3 className="text-white mb-3">Movie Series</h3>
                    {SingleVideoDetails.files?.map((x, i) => (
                      <>
                        {i !== 0 ? (
                          <Link to={`/web_series/player/${SingleVideoDetails.id}/${i}`} className="row" style={{ textDecoration: "none" }}>
                            <div className={`col-6 col-md-4 col-lg-3 col-xxl-2 pb-3`}>
                              <div className="video_thumbnail w-100">
                                <Image className="d-block carousel_item img-fluid" src={SingleVideoDetails?.cover} alt="#" width="100%" height="275px" style={{ height: "275px", width: "206px", borderRadius: "10px", fitContent: "cover", }} placeholderColor="#192133" />
                              </div>
                            </div>

                            <div className={`col-6 col-md-8 col-lg-9 col-xxl-10 px-lg-8 pb-3`}>
                              <div className="video_thumbnail w-100">
                                {/* <h3 className="text-white"><span className="player_series_title text-white">{SingleVideoDetails.titke}</span>{" "} Part ({i + 1})</h3> */}
                                <h4 className="text-white"><b>{SingleVideoDetails?.title}- Part ({i + 1})</b></h4>
                                <h5 className="text-white" style={{ fontSize: "16px" }}>
                                  <span style={{ color: "rgba(236,231,231,0.65)", fontWeight: "600" }}>{SingleVideoDetails.released}</span>{" "} * <span className="text-primary"><b>{SingleVideoDetails?.tags}</b></span>
                                </h5>
                                <h5 style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)" }}>
                                  {SingleVideoDetails?.description}
                                </h5>
                                <h6 style={{ color: "white", fontSize: "18px", marginTop: "20px", }}>
                                  <i className="fa fa-play"></i> WATCH MOVIE
                                </h6>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        </>
      ) : (
        <>
          <div className="SingleVideo text-light">
            <LoadingDataForSingleVideoPage />
          </div>
        </>
      )}
    </>
  );
}

export default JWPlayer;
