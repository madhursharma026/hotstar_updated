import './Trailers.css'
import { Link } from 'react-router-dom'


function Trailers(props) {
    const { TrailersData } = props;
    return (
        <>
            <div className='Trailers text-light pt-lg-5 pt-3 zoom_on_hover_effect_for_trailers'>
                <h4 className='text-white'>Trailers & Extras</h4>
                <div style={{ height: "275px", width: "206px" }}>
                    <Link to={`/trailer_player/${TrailersData?.id}`}>
                        <div className="trailers_video_thumbnail">
                            <img className="d-block" src={TrailersData?.cover} alt="#" style={{ height: "275px", width: "206px", borderRadius: "10px" }} />
                            <div className='w-100 px-2 trailers_video_description'>
                                <h6>{TrailersData.title}</h6>
                                <h6 style={{ color: "white", fontSize: "10px" }}><i className="fa fa-play"></i> WATCH MOVIE</h6><br />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <br />
        </>
    );
}
export default Trailers;
