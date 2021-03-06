import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createDisLike, removeDisLike } from "../../../actions/post";

class DisLike extends React.Component {
  onDisLikeClick = (e) => {
    e.preventDefault();
    const { auth, postId, dislikes, TYPE } = this.props;
    if (auth.isAuthenticated) {
      const existedDisLike = dislikes.find((l) => l.user === auth.user.id);
      if (existedDisLike) {
        this.props.removeDisLike(postId, existedDisLike._id, TYPE);
      } else {
        this.props.createDisLike(postId, TYPE);
      }
    }
  };

  render() {
    const { dislikes } = this.props;
    return (
      <a
        href="#"
        role="button"
        className="card-link"
        onClick={this.onDisLikeClick}
      >
        <i className="fa fa-thumbs-down"></i> {dislikes.length}
      </a>
    );
  }
}

DisLike.propTypes = {
  createDisLike: PropTypes.func.isRequired,
  removeDisLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  dislikes: PropTypes.array.isRequired,
  TYPE: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { createDisLike, removeDisLike })(DisLike);
