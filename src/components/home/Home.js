import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Card,
  Col,
  Row,
  Avatar,
  Badge,
  Alert,
  Comment,
  Form,
  Input,
  Button,
  Radio,
  message,
  Empty,
} from "antd";
import "./Home.css";
import { articles } from "./rawData";
import history from "../history";
import Blog from "../constants/Comment";
import MySpinner from "../constants/Spinner";

const { TextArea } = Input;
const { Meta } = Card;

class Home extends Component {
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
    if (!this.props.user) {
      history.push("/login");
    }

    //GET COVID DATA
    try {
      const res = await axios.get(
        `https://api.covid19india.org/state_district_wise.json`
      );
      const stateData = res.data["Maharashtra"]["districtData"];

      this.setState({
        data: stateData,
        loading: false,
      });
    } catch (error) {
      this.setState({
        updateNotFound: true,
        loading: false,
      });
    }

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
      this.setState({ blogs: res.data });
    } catch (error) {
      this.setState({
        blogsNotFound: true,
      });
      console.log("Can't get Blogs");
    }
  }

  handleSubmit = async () => {
    const { title, body, status } = this.state;

    try {
      await axios.post(
        `https://solace-hack-kj.herokuapp.com/api/blogs/publish`,
        {
          title,
          body,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.user}`,
          },
        }
      );
      this.setState({ title: "", body: "", status: "" });
      message.success({
        content: "Blog Successfully Submitted!",
        duration: 3,
        className: "my-message",
      });
    } catch (error) {
      message.error({
        content: "Blog Submission Failed!",
        duration: 3,
        className: "my-message",
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  };

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
    const { data, updateNotFound, blogsNotFound, loading } = this.state;

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

        {/* Updates */}
        {updateNotFound ? (
          <Empty className="m-3" />
        ) : (
          <div className="site-card-wrapper">
            <Row className="m-3" gutter={16}>
              {articles.map((art, key) => {
                return (
                  <Col key={key} span={8} className="p-3">
                    <Badge.Ribbon
                      text={`Active Cases: ${data[art.title]["active"]}`}
                    >
                      <Badge.Ribbon
                        placement="start"
                        color="purple"
                        text={`Recovered Cases: ${
                          data[art.title]["recovered"]
                        }`}
                      >
                        <Card
                          style={{ height: 550 }}
                          cover={
                            <img
                              style={{ height: 270 }}
                              alt="img"
                              src={art.img}
                            />
                          }
                        >
                          <Meta
                            avatar={
                              <Avatar className="avatar" size="large" gap={4}>
                                {art.title.charAt(0)}
                              </Avatar>
                            }
                            title={art.title}
                            description={art.desc}
                          />
                        </Card>
                      </Badge.Ribbon>
                    </Badge.Ribbon>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}

        {/* Communicate */}
        <div id="postblog" className="jumbotron jumbotron-fluid mt-3">
          <div className="container py-1">
            <h1 className="display-4">Let's Communicate</h1>
            <p className="lead">
              Communication is key. Let us know how you're feeling.. It'll stay
              <b> anonymous 😇</b>
            </p>
            <hr className="my-4" />
            <Comment
              avatar={
                <Avatar
                  size="large"
                  src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
                />
              }
              content={
                <>
                  <Form layout="vertical" onFinish={this.handleSubmit}>
                    <Form.Item label="Title">
                      <Input
                        type="text"
                        name="title"
                        size="large"
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                    </Form.Item>
                    <Form.Item label="Body">
                      <TextArea
                        rows={7}
                        name="body"
                        value={this.state.body}
                        onChange={this.handleChange}
                        placeholder="Tell us how you're feeling..."
                      />
                    </Form.Item>
                    <Form.Item label="Covid Status">
                      <Radio.Group
                        name="status"
                        size="large"
                        value={this.state.status}
                        onChange={this.handleChange}
                      >
                        <Radio.Button value="Healthy">Healthy</Radio.Button>
                        <Radio.Button value="Recovering">
                          Recovering
                        </Radio.Button>
                        <Radio.Button value="Recovered">Recovered</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                      <Button size="large" htmlType="submit" type="primary">
                        Submit Blog
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              }
            />
          </div>
        </div>

        {/* Blogs */}
        {blogsNotFound ? (
          <Empty className="m-3" />
        ) : (
          <div id="blogs" className="blogs" style={{ margin: "0 10rem" }}>
            <h2 className="display-4">Find out how others are doing..</h2>
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

export default connect(mapStateToProps)(Home);
