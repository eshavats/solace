import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./Home.css";
import { articles } from "./rawData";
import Blog from "../constants/Comment";
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
  Space,
  Spin,
} from "antd";

const { TextArea } = Input;
const { Meta } = Card;

class Home extends Component {
  state = {
    data: {},
    loading: true,
    notFound: false,
    title: "",
    body: "",
    status: "",
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
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
        notFound: true,
        loading: false,
      });
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
      message.success({
        content: "Blog Successfully Submitted!",
        duration: 5,
        className: "my-message",
      });
    } catch (error) {
      message.error({
        content: "Blog Submission Failed!",
        duration: 5,
        className: "my-message",
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  };

  render() {
    var data = this.state.data;
    console.log(this.props.user);

    if (this.state.loading) {
      return (
        <Space style={{ textAlign: "center" }} size="middle">
          <Spin tip="Loading..." size="large" />
        </Space>
      );
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
                      text={`Recovered Cases: ${data[art.title]["recovered"]}`}
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

        <div className="jumbotron jumbotron-fluid mt-3">
          <div className="container">
            <h1 className="display-4">Let's communicate</h1>
            <p className="lead">
              Communication is key. Let us know how you're feeling.. It'll stay
              <b> anonymous</b>
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
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                    </Form.Item>
                    <Form.Item label="Body">
                      <TextArea
                        rows={4}
                        name="body"
                        value={this.state.body}
                        onChange={this.handleChange}
                        placeholder="Tell us how you're feeling..."
                      />
                    </Form.Item>
                    <Form.Item label="Covid Status">
                      <Radio.Group
                        name="status"
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
                      <Button htmlType="submit" type="primary">
                        Add Comment
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              }
            />
          </div>
        </div>
        <div className="blogs" style={{ margin: "0 10rem" }}>
          <h2 className="display-4">Find out how others are doing..</h2>

          <Blog
            title="My Recovery Story"
            description="I am interning at the orthopedic department of the Government Kilpauk Medical College in Chennai. On May 31, after my duty, I felt fatigued and went home. I had a body ache and went off to sleep without dinner. When I woke up, I had a raised temperature. I couldn't have food or water properly. It escalated quickly in the next 30 minutes, and suddenly I had difficulty in breathing. I didn't know if it was due to anxiety or Covid symptoms. I went to the hospital, gave a swab that night and was admitted to the emergency ward. My result came 24 hours later and I was positive."
            status="Recovering"
            date="12/03/2021 9:30PM"
          />
          <Blog
            title="My Recovery Story"
            description="I am interning at the orthopedic department of the Government Kilpauk Medical College in Chennai. On May 31, after my duty, I felt fatigued and went home. I had a body ache and went off to sleep without dinner. When I woke up, I had a raised temperature. I couldn't have food or water properly. It escalated quickly in the next 30 minutes, and suddenly I had difficulty in breathing. I didn't know if it was due to anxiety or Covid symptoms. I went to the hospital, gave a swab that night and was admitted to the emergency ward. My result came 24 hours later and I was positive."
            status="Recovering"
            date="12/03/2021 9:30PM"
          />
          <Blog
            title="My Recovery Story"
            description="I am interning at the orthopedic department of the Government Kilpauk Medical College in Chennai. On May 31, after my duty, I felt fatigued and went home. I had a body ache and went off to sleep without dinner. When I woke up, I had a raised temperature. I couldn't have food or water properly. It escalated quickly in the next 30 minutes, and suddenly I had difficulty in breathing. I didn't know if it was due to anxiety or Covid symptoms. I went to the hospital, gave a swab that night and was admitted to the emergency ward. My result came 24 hours later and I was positive."
            status="Recovering"
            date="12/03/2021 9:30PM"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.users };
};

export default connect(mapStateToProps)(Home);
