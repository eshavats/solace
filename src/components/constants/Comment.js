import React from "react";
import { PageHeader, Tag, Typography, Row, Button, Tooltip } from "antd";

const { Paragraph } = Typography;

const Content = ({ children }) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
  </Row>
);

class Comment extends React.Component {
  selectTagColor = (status) => {
    if (status === "Healthy") {
      return "green";
    } else if (status === "Recovered") {
      return "blue";
    } else {
      return "orange";
    }
  };

  render() {
    return (
      <PageHeader
        title={this.props.title}
        className="site-page-header mb-4"
        style={{ border: "1px solid #E9ECEF" }}
        subTitle={this.props.date}
        tags={
          <Tag color={this.selectTagColor(this.props.status)}>
            {" "}
            {this.props.status}
          </Tag>
        }
        avatar={{
          src:
            "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
        }}
        extra={[
          <Tooltip title="Like">
            <Button
              key="1"
              type="danger"
              icon={<i className="mr-2 far fa-heart"></i>}
            >
              {this.props.likes === 0 ? 20 : this.props.likes}
            </Button>
          </Tooltip>,
        ]}
      >
        <Content>
          <Paragraph>{this.props.body}</Paragraph>{" "}
        </Content>
      </PageHeader>
    );
  }
}

export default Comment;
