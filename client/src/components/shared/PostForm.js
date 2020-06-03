import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Quill from "react-quill";

import { create } from "../../actions/post";

class PostForm extends React.Component {
  constructor() {
    super();
    this.state = { body: "" };
  }

  onChangeBody = (body) => this.setState({ body });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.create(this.state);
    this.setState({ body: "" });
  };

  render() {
    return (
      <div className="card mb-4 bg-secondary">
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group bg-white" >
              <Quill
                placeholder="Write something here!"
                theme="snow"
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"], // toggled buttons
                    ["blockquote", "code-block"],
                    ['link', 'image', 'video'],

                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ script: "sub" }, { script: "super" }], // superscript/subscript
                    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                    [{ direction: "rtl" }], // text direction

                    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ font: [] }],
                    [{ align: [] }],

                    ["clean"], // remove formatting button
                  ],
                }}
                value={this.state.body}
                onChange={this.onChangeBody}
              />
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              Add Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  create: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { create })(PostForm);
