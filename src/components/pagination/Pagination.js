import React, { Component } from "react";
import Button from "../buttons/Button";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  currentTap,
  fetchMoviesReq,
  searchKeyword,
  sortBy,
  currentPage,
  fetchRecommendedMoviesRequest
} from "../../store/actions";
import history from "../../routes/History";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = ({ page }, next) => {
    console.log(history.location.pathname.includes("movie"));

    switch (true) {
      case history.location.pathname.includes("movie"):
        console.log("movieeeeeeeeee");

        this.props.fetchRecommendedMoviesRequest(
          history.location.pathname.replace("/", ""),
          {
            page: next ? page + 1 : page - 1
          }
        );
        break;
      case history.location.pathname.includes("person"):
        this.props.fetchMoviesReq("", {
          page: next ? page + 1 : page - 1,
          with_genres: true,
          with_cast: history.location.pathname.replace("/person/", "")
        });
        break;
      default:
        this.props.fetchMoviesReq(this.props.tap.api, {
          page: next ? page + 1 : page - 1,
          with_genres:
            this.props.tap.id === 1 ||
            this.props.tap.id === 2 ||
            this.props.tap.id === 3
              ? ""
              : this.props.tap.id,
          query: this.props.search ? this.props.search : "",
          sort_by: this.props.sortKey ? this.props.sortKey : ""
        });
    }
  };

  renderNextBtn = () => {
    this.props.currentPage(this.props.movies.page || 1);
    return (
      <div onClick={() => this.handleClick(this.props.movies, true)}>
        <Button
          content={`page ${this.props.movies.page + 1}`}
          theme="primary"
          icon={faArrowRight}
          order="1"
          iconMargin="l"
        />
      </div>
    );
  };

  renderBackBtn = () => {
    return (
      <div onClick={() => this.handleClick(this.props.movies, false)}>
        <Button
          content={`page ${this.props.movies.page - 1}`}
          theme="primary"
          icon={faArrowLeft}
          order="0"
          iconMargin="r"
        />
      </div>
    );
  };

  render() {
    const isMorePage = this.props.movies.total_pages - this.props.movies.page;
    const isBack = this.props.movies.page > 1 ? true : false;
    const classMap = isBack
      ? "d-flex align-items-center  justify-content-between"
      : "d-flex align-items-center justify-content-end";
    return (
      <div className={classMap}>
        {isBack ? this.renderBackBtn() : ""}
        {isMorePage !== 0 ? this.renderNextBtn() : ""}
      </div>
    );
  }
}

const mapStateToProps = ({
  currentTap,
  movies,
  searchKeyword,
  sortBy,
  currentPage
}) => {
  return {
    ...currentTap,
    movies,
    ...searchKeyword,
    sortKey: sortBy,
    page: currentPage
  };
};

export default connect(
  mapStateToProps,
  {
    currentTap,
    fetchMoviesReq,
    searchKeyword,
    sortBy,
    currentPage,
    fetchRecommendedMoviesRequest
  }
)(Pagination);
