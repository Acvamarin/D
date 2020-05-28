import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pagination from "react-js-pagination"


import './Filtrs.css'
import {getAll} from '../../actions/post'

import Post from './../shared/Post/Post'
import Loader from './../shared/Loader/Loader'

class Filtrs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Отправленное имя: ' + this.state.value);
        event.preventDefault();
      }

    componentDidMount() {
        this.props.getAll()
    }
   
   







    render() {

        const { isLoading, posts, totalCount } = this.props.post
        return (

            <React.Fragment><div className="row mt-4">

                <div className="col-md-8 mx-auto">
                    <div className='d1'>
                        <form onSubmit={this.handleSubmit}>
                            <input vtype="text" value={this.state.value} onChange={this.handleChange} placeholder="Искать здесь..."></input>
                            <button type="submit"></button>
                        </form>
                    </div>
               

                    {isLoading && <Loader />}
                    {!isLoading && totalCount === 0 && (
                        <div className="text-center ">
                            <h2>There is nothing</h2>
                        </div>
                    )}
                    {posts.map((p) => { if (p.user.name == this.state.value) { return <Post post={p} key={p._id} /> } })}

                </div>
            </div>
            </React.Fragment>
        )
    }
}

Filtrs.propTypes = {
    getAll: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

}
const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getAll })(Filtrs)