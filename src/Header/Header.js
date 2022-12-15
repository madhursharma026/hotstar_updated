import "./Header.css";
import { useAuth } from "../hooks/useAuth";
import { useGetUser } from "../hooks/useGetUser";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { HeaderSearch, LogoutUser } from "../actions";
import { LogoutSchema } from "../Schemas/LogoutSchema";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

function Header(props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();
  const dispatch = useDispatch();
  const [SearchWord, setSearchWord] = useState("");

  const handleSearchWord = (value) => {
    setSearchWord(value);
    dispatch(HeaderSearch(value));
  };

  const searchWordRedux = useSelector(
    (state) => state.ReduxCommands.SearchInput
  );

  useEffect(() => {
    setSearchWord(searchWordRedux);
  }, [searchWordRedux]);

  useAuth();

  async function onSearchFormSubmit(e) {
    e.preventDefault();
    fetch(`${props.BaseUrl}/search_word/${SearchWord}`).then((result) => {
      result.json().then((resp) => {
        localStorage.setItem("SearchWord", JSON.stringify(SearchWord));
        localStorage.setItem("SearchData", JSON.stringify(resp));
        history.push({ pathname: "/search_result" });
      });
    });
  }
  const onEnterPress = (e) => {
    if (e.key === "Enter" && SearchWord.length >= 1) {
      history.push("/search_result");
    }
  };

  const user = useGetUser();

  const [logoutFunction] = useMutation(LogoutSchema);

  return (
    <>
      <div className="fixed-top Header">
        <nav className="navbar">
          <div className="container-fluid px-3 px-sm-5">
            <ul className="mt-3" style={{ paddingLeft: "0" }}>
              <Link to="/" style={{ textDecoration: "none", color: "white", fontSize: "22px" }}>
                <b>Home</b>
              </Link>
            </ul>
            <div className="d-flex">
              {user ?
                <>
                  <form onSubmit={onSearchFormSubmit} style={{ display: "inline" }}>
                    <input type="search" className="search-box" placeholder="Search" required autoComplete="off" value={SearchWord} onKeyDown={onEnterPress} onChange={(e) => handleSearchWord(e.target.value)} />
                  </form>
                  <Link to="/login" style={{ textDecoration: "none", color: "white", paddingLeft: "10px", }} onClick={() => { logoutFunction({ variables: { userId: user.id, userCollection: user.collection, devise: "", }, }).then(console.log); dispatch(LogoutUser()); }}>
                    <b>Logout</b>
                  </Link>
                </>
                :
                <Link to="/login" style={{ textDecoration: "none", color: "white", paddingLeft: "10px", }} className="login_btn">
                  <b>LOGIN</b>
                </Link>
              }
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
export default Header;

