import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Alert,
  Empty,
} from "antd";
import Blog from "../constants/Comment";
import MySpinner from "../constants/Spinner";
import "./Blogs.css"

class Blogs extends Component {
  state = {
    data: {},
    loading: true,
    updateNotFound: false,
    blogsNotFound: false,
    title: "",
    body: "",
    status: "",
    blogs: [],
  };

  async componentDidMount() {

    document.title = "Blogs at Solace"

    //GET BLOGS DATA
    try {
      const res = await axios.get(
        `https://solace-hack-kj.herokuapp.com/api/blogs`,
        {
          headers: {
            Authorization: `Bearer ${this.props.user}`,
          },
        }
      );

      console.log(res.data);
      this.setState({ blogs: res.data, loading: false });
    } catch (error) {
      this.setState({
        blogsNotFound: true,
      });
      console.log("Can't get Blogs");
    }
  }

  fetchBlogs = () => {
    return this.state.blogs.map((blog, key) => {
      var d = new Date(blog["time"]);
      return (
        <Blog
          key={key}
          title={blog["title"]}
          body={blog["body"]}
          status={blog["status"]}
          date={`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}
          likes={blog["likes"]}
        />
      );
    });
  };

  render() {
    const { blogsNotFound, loading } = this.state;

    if (loading) {
        return <MySpinner />;
      }
    return (
      <div className="homepage mb-4">
        <Alert
          message="COVID-19"
          description="The virus that causes COVID-19 is mainly transmitted through droplets generated when an infected person coughs, sneezes, or exhales. These droplets are too heavy to hang in the air, and quickly fall on floors or surfaces.
          You can be infected by breathing in the virus if you are within close proximity of someone who has COVID-19, or by touching a contaminated surface and then your eyes, nose or mouth."
          type="info"
          showIcon
        />

        {/* Blogs */}
        {blogsNotFound ? (
          <Empty className="m-3" />
        ) : (
          <div id="blogs" className="blogs-div">
            <h1 className="display-4">Find out how others are doing..</h1>
            {this.fetchBlogs()}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.users };
};

export default connect(mapStateToProps)(Blogs);
