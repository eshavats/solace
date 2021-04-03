import React from "react";
import { PageHeader, Tag, Typography, Row } from "antd";

const { Paragraph } = Typography;

const Content = ({ children }) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
  </Row>
);

class Comment extends React.Component {
  render() {
    return (
      <PageHeader
        title={this.props.title}
        className="site-page-header mb-4"
        style={{border: "1px solid #E9ECEF"}}
        subTitle={this.props.date}
        tags={<Tag color="blue"> {this.props.status}</Tag>}
        avatar={{
          src:
            "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png",
        }}
      >
        <Content>
          <Paragraph>{this.props.description}</Paragraph>{" "}
        </Content>
      </PageHeader>
    );
  }
}

export default Comment;
