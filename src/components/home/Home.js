import React, { Component } from "react";
import axios from "axios";
import { Card, Col, Row, Avatar, Badge } from "antd";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const articles = [
  {
    img:
      "https://www.avert.org/sites/default/files/styles/article_scale_style_780/public/COVID%20quiz.jpg?itok=o7_qlduX&timestamp=1586435165",
    title: "Mumbai",
    desc:
      "Mumbai city continues to report a massive spike in new COVID-19 cases with over 8,000 people testing positive for the virus for the second consecutive day. Today, 8,832 people tested positive for COVID, the highest since the pandemic began, taking the overall tally to 4,32,192. The city also reported 20 deaths, the highest casualties this year, taking the overall toll count to 11,724. Dharavi, one of the hotspots in the city crossed the 5,000 mark with 73 new cases.",
  },
  {
    img:
      "https://res.cloudinary.com/firstboard/image/upload/s--jNICEN_R--/v1602209789/w4ylithhryjoxumoa7jn.jpg",
    title: "Pune",
    desc:
      "Breaking all previous records, Pune recorded the detection of 9,126 cases of coronavirus infections on Friday, the highest that any city in India has ever reported. The previous highest for any city was recorded just a day earlier, when Mumbai had reported 8,646 infections. Before this, Delhi had recorded 8,593 cases on November 1 last year.",
  },
  {
    img:
      "http://bethliving.com/blog/wp-content/uploads/2020/04/Kangwon-Covid-19.jpeg",
    title: "Thane",
    desc:
      "Maharashtra has reported 43,183 new Covid-19 cases, its highest one-day rise since the pandemic began. Mumbai reported 8,646 new cases, which increased its caseload to 423,419. Meanwhile, Delhi logged 3,583 fresh Covid cases, the highest daily count this year. In the wake of corona surge in the national capital, Chief Minister Arvind Kejriwal will hold an urgent meeting with the health minister and officials today.",
  },
];

class Home extends Component {
  state = { data: {}, loading: true, notFound: false };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `https://api.covid19india.org/state_district_wise.json`
      );
      const stateData = response.data["Maharashtra"]["districtData"];

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

  render() {
    var data = this.state.data;
    console.log(data);
    if (this.state.loading) {
      return <div>Loading ....</div>;
    }
    return (
      <div>
        <div className="site-card-wrapper">
          <Row className="m-3" gutter={16}>
            {articles.map((art) => {
              return (
                <Col span={8}>
                  <Badge.Ribbon text={`Active Cases: ${data[art.title]["active"]}`}>
                    <Card
                      style={{ height: 500 }}
                      cover={
                        <img style={{ height: 270 }} alt="img" src={art.img} />
                      }
                      // actions={[
                      //   <SettingOutlined key="setting" />,
                      //   <EditOutlined key="edit" />,
                      //   <EllipsisOutlined key="ellipsis" />,
                      // ]}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={art.title}
                        description={art.desc}
                      />
                    </Card>
                  </Badge.Ribbon>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
