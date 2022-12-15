import "./Routing.css";
import React, { Suspense } from "react";
// import Login from './Login/Login';
// import JWPlayer from './Player/JWPlayer';
// import ConfirmOTP from './Login/ConfirmOTP';
// import SeriesPlayer from './Player/SeriesPlayer';
// import SearchResult from './SearchResult/SearchResult';
// import TrailersPlayer from './TrailersPlayer/TrailersPlayer';
// import SingleCategoryVideo from './SingleCategoryVideo/SingleCategoryVideo';
// import MovieCategoryVideo from './MovieCategory/MovieCategory';
// import Header from './Header/Header';
// import Homepage from './Homepage/Homepage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// LAZY LOADING
const Login = React.lazy(() => import("./Login/Login"));
const JWPlayer = React.lazy(() => import("./Player/JWPlayer"));
const ConfirmOTP = React.lazy(() => import("./Login/ConfirmOTP"));
const SeriesPlayer = React.lazy(() => import("./Player/SeriesPlayer"));
const SearchResult = React.lazy(() => import("./SearchResult/SearchResult"));
const TrailersPlayer = React.lazy(() =>
  import("./TrailersPlayer/TrailersPlayer")
);
const SingleCategoryVideo = React.lazy(() =>
  import("./SingleCategoryVideo/SingleCategoryVideo")
);
const MovieCategoryVideo = React.lazy(() =>
  import("./MovieCategory/MovieCategory")
);
const Header = React.lazy(() => import("./Header/Header"));
const Homepage = React.lazy(() => import("./Homepage/Homepage"));

function Routing() {
  const BASEURL = "https://api.goldmovie.in";

  const authMiddleware = setContext(async (req, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  });

  const httpLink = new HttpLink({
    // uri: "http://localhost:3000/graphql",
    uri: "https://buddy9.dreamstack.com/graphql",
  });

  const apolloClient = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: { mutate: { errorPolicy: "none" } },
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Suspense fallback={<></>}>
          <Route exact path="/login">
            <Login BaseUrl={BASEURL} />
          </Route>
          <Route exact path="/confirm_otp">
            <ConfirmOTP BaseUrl={BASEURL} />
          </Route>
          <Route exact path="/">
            <Header BaseUrl={BASEURL} />
            <div className="margin_top_for_body_after_header">
              <Homepage BaseUrl={BASEURL} />
              {/*<Footer />*/}
            </div>
          </Route>
          <Route exact path="/single_category/:category_id">
            <Header BaseUrl={BASEURL} />
            <div className="margin_top_for_body_after_header">
              <SingleCategoryVideo BaseUrl={BASEURL} />
              {/*<Footer />*/}
            </div>
          </Route>
          <Route exact path="/movie_category/Hindi">
            <Header BaseUrl={BASEURL} />
            <div className="margin_top_for_body_after_header">
              <MovieCategoryVideo page="Hindi" BaseUrl={BASEURL} />
              {/*<Footer />*/}
            </div>
          </Route>
          <Route exact path="/movie_category/Dubbed">
            <Header BaseUrl={BASEURL} />
            <div className="margin_top_for_body_after_header">
              <MovieCategoryVideo page="Dubbed" BaseUrl={BASEURL} />
              {/*<Footer />*/}
            </div>
          </Route>
          <Route exact path="/movie_category/WebSeries">
            <Header BaseUrl={BASEURL} />
            <div className="margin_top_for_body_after_header">
              <MovieCategoryVideo page="Web Series" BaseUrl={BASEURL} />
              {/*<Footer />*/}
            </div>
          </Route>
          <Route exact path="/search_result">
            <Header BaseUrl={BASEURL} />
            <div className="margin_top_for_body_after_header">
              <SearchResult BaseUrl={BASEURL} />
              {/*<Footer />*/}
            </div>
          </Route>
          <Route exact path="/player/:single_video_id">
            <Header BaseUrl={BASEURL} />
            <div className="margin_top_for_body_after_header">
              <JWPlayer BaseUrl={BASEURL} />
            </div>
          </Route>
          <Route exact path="/trailer_player/:single_video_id">
            <Header BaseUrl={BASEURL} />
            <div className="margin_top_for_body_after_header">
              <TrailersPlayer BaseUrl={BASEURL} />
            </div>
          </Route>
          <Route exact path="/web_series/player/:single_video_id/:series_no">
            <Header BaseUrl={BASEURL} />
            <div className="margin_top_for_body_after_header">
              <SeriesPlayer BaseUrl={BASEURL} />
            </div>
          </Route>
        </Suspense>
      </Router>
    </ApolloProvider>
  );
}

export default Routing;
