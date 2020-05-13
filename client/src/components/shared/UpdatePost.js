import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Quill from 'react-quill'

import { update } from '../../actions/post'



class UpdatePost extends React.Component {

  constructor() {
    super()
    this.state = {body: ``}
  }

  onChangeBody = (body) => this.setState({ body })

  onSubmit = (e) => {
    e.preventDefault()
    this.props.update(this.state)
    this.setState({ body: '' })
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <Quill
                placeholder="What's up?"
                theme="snow"
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link', 'image', 'video'],
                    ['clean']
                  ]
                }}
                value={this.state.body}
                onChange={this.onChangeBody}
              />
            </div>
              
            <div className="btn-group float-right">
              <button type="submit" className="btn btn-dark">Update</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

UpdatePost.propTypes = {
  update: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth,
})

export default connect(mapStateToProps, { update })(UpdatePost)
