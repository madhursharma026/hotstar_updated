import './VideoPlayer.css'
import Footer from "../Footer/Footer";
import ReactJWPlayer from "react-jw-player";
import { useParams } from 'react-router-dom';
import { Image } from 'react-img-placeholder';
import Trailers from "../TrailersPlayer/Trailers";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import React, { useState, useEffect } from "react";
import LoadingDataForSingleVideoPage from '../LoadingData/LoadingDataForSingleVideoPage';
import {useQuery} from "@apollo/client";
import {FindMovieByIdSchema} from "../Schemas/FindMovieById";

function SeriesPlayer(props) {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])


    const { single_video_id } = useParams();
    const { series_no } = useParams();
    const [TrailersData, setTrailersData] = useState([])
    const [SingleVideoDetails, setSingleVideoDetails] = useState([])
    const gettingUserDetails = useSelector((state) => state.ReduxCommands.LoginDetails);

    // useEffect(() => {
    //     fetch(`${props.BaseUrl}/single_videos_for_player/${single_video_id}`).then((result) => {
    //         result.json().then((resp) => {
    //             setSingleVideoDetails(resp)
    //             setTrailersData(resp)
    //             setloading(true)
    //         })
    //     })
    // }, [])

    const { data, error,loading } = useQuery(FindMovieByIdSchema, {
        variables: {
            movieId: Number(single_video_id),
        },
        skip: !single_video_id,
    });

    useEffect(() => {
        if(data) {
            setSingleVideoDetails(data?.findMovieById);
            setTrailersData(data?.findMovieById);
        }
    }, [data]);


    console.log(data?.findMovieById)
    return (
        <>
            {!loading ?
                <>
                     {/*{*/}
                     {/*   SingleVideoDetails.map((SingleVideoDetails, i) =>*/}
                            <>
                                <div className="VideoPlayer px-2 px-sm-5 pt-5">
                                    <ReactJWPlayer
                                        playerId={SingleVideoDetails.id}
                                        playerScript="https://content.jwplatform.com/libraries/tqjyvT9W.js"
                                        file={SingleVideoDetails.files?.[series_no].url}
                                        image={SingleVideoDetails.cover}
                                        aspectRatio="22:9"
                                        customProps={{
                                            playbackRateControls: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
                                            cast: {}
                                        }}
                                    />
                                </div>
                                <h3 className="text-white px-5 mt-5">{SingleVideoDetails.title}</h3>
                                <h5 className="text-white px-5" >{SingleVideoDetails.released} * <span className="text-primary">{SingleVideoDetails.tags}</span></h5>
                                <h5 className="text-white px-5" >{SingleVideoDetails.description}</h5>
                                <div className="px-5">
                                    <Trailers TrailersData={TrailersData} />
                                </div>
                                {(SingleVideoDetails?.files?.length !== 1) ?
                                    <>
                                        <div className="px-5">
                                            <h3 className='text-white mb-3'>Movie Series</h3>
                                            {
                                                SingleVideoDetails?.files?.map((x, i) =>
                                                    <>
                                                        {
                                                            i !== series_no ?
                                                                <Link to={`/web_series/player/${SingleVideoDetails.id}/${i}`} className="row" style={{ textDecoration: "none" }}>
                                                                    <div className={`col-6 col-md-4 col-lg-3 col-xxl-2 pb-3`}>
                                                                        <div className="video_thumbnail w-100">
                                                                            <Image className="d-block carousel_item img-fluid" src={SingleVideoDetails.cover} alt="#" width="100%" height="275px" style={{ minHeight: "100%", maxHeight: "275px", width: "100%",fitContent:'cover' }} placeholderColor="#192133" />
                                                                        </div>
                                                                    </div>

                                                                    <div className={`col-6 col-md-8 col-lg-9 col-xxl-10 px-lg-8 pb-3`}>
                                                                        <div className="video_thumbnail w-100">
                                                                            <h1 className="text-white"><span className="player_series_title text-white">{SingleVideoDetails.movie_title}</span> Part ({i + 1})</h1>
                                                                            <p style={{ fontSize: "22px", marginTop: "-5px" }} className="player_series_description text-white">{SingleVideoDetails.released} * {SingleVideoDetails.description}</p>
                                                                            <h6 style={{ color: "white", fontSize: "18px", marginTop: "20px" }}><i className="fa fa-play"></i> WATCH MOVIE</h6>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                                :
                                                                <></>
                                                        }
                                                    </>
                                                )}
                                        </div>
                                    </>
                                    :
                                    <></>
                                }
                            </>
                        {/*)*/}
                    {/*}*/}
                    <Footer />
                </>
                :
                <>
                    <div className='SingleVideo text-light px-5'>
                        <LoadingDataForSingleVideoPage />
                        <Footer />
                    </div>
                </>
            }
        </>
    );
}

export default SeriesPlayer;


