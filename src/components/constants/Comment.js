import React from "react";
import { PageHeader, Menu, Dropdown, Button, Tag, Typography, Row } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const content = (
  <>
    <Paragraph>
      Ant Design interprets the color system into two levels: a system-level
      color system and a product-level color system.
    </Paragraph>
    <Paragraph>
      Ant Design&#x27;s design team preferred to design with the HSB color
      model, which makes it easier for designers to have a clear psychological
      expectation of color when adjusting colors, as well as facilitate
      communication in teams.
    </Paragraph>
  </>
);

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
