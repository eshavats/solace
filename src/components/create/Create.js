import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Avatar,
  Alert,
  Comment,
  Form,
  Input,
  Button,
  Radio,
  message,
} from "antd";

import history from "../history";
import MySpinner from "../constants/Spinner";

const { TextArea } = Input;

class Create extends Component {
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

    document.title = "Create a Blog"

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

  render() {
    const { loading } = this.state;

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
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.users };
};

export default connect(mapStateToProps)(Create);
