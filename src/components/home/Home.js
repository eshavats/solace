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
  message,
  Empty,
} from "antd";
import "./Home.css";
import { articles } from "./rawData";
import news from "./news"
import Blog from "../constants/Comment";
import MySpinner from "../constants/Spinner";
import {res as apiRes} from "./apiRespose";

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

    document.title = "Solace | Connect, chat, read latest news and articles and find solace"


    //GET COVID DATA
    try {
      // const res = await axios({
      //   method: 'GET',
      //   withCredentials: false,
      //   url: `https://api.covid19india.org/state_district_wise.json`
      // });
      // console.log(res);

      const res = apiRes;
      const stateData = res["Maharashtra"]["districtData"];
      console.log(stateData);

      this.setState({
        data: stateData,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        updateNotFound: true,
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

  fetchNews = () => {
    return news.map((blog, key) => {
      return (
        <Blog
          key={key}
          title={blog["title"]}
          body={blog["content"]}
          status={blog["source"]["name"]}
          date={blog["publishedAt"]}
          likes={blog["source"]["likes"]}
        />
      );
    });
  };

  render() {
    const { data, updateNotFound, loading } = this.state;

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
      
        <div id="news" className="news" style={{ margin: "2rem 10rem" }}>
            <h2 className="display-4">Find the latest health news and trending articles</h2>
            {this.fetchNews()}
        </div>
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.users };
};

export default connect(mapStateToProps)(Home);
