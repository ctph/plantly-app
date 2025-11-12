import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Space,
  Image,
  Input,
  List,
  Tooltip,
  Divider,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  SendOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export default function FeedCard({
  author,
  avatar,
  time,
  image,
  caption,
  initialLikes = 0,
  initialComments = [],
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [draft, setDraft] = useState("");

  const toggleLike = () => {
    setLiked((v) => !v);
    setLikes((n) => (liked ? n - 1 : n + 1));
  };

  const addComment = () => {
    const text = draft.trim();
    if (!text) return;
    setComments((arr) => [...arr, { id: Date.now(), author: "you", text }]);
    setDraft("");
  };

  return (
    <Card
      className="feed-card plantly-card"
      styles={{ body: { padding: 0 } }}
      bordered={false}
    >
      {/* header */}
      <div className="feed-header">
        <Space>
          <Avatar src={avatar} size={40} />
          <Space direction="vertical" size={0}>
            <Text strong>{author}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {time}
            </Text>
          </Space>
        </Space>
        <MoreOutlined style={{ fontSize: 18, color: "#999" }} />
      </div>
      {/* media */}
      <div className="feed-media">
        <img src={image} alt={caption || "post"} />
      </div>
      {/* actions */}
      <div className="feed-actions">
        <Space size="large">
          <Tooltip title={liked ? "Unlike" : "Like"}>
            {liked ? (
              <HeartFilled onClick={toggleLike} className="icon-like liked" />
            ) : (
              <HeartOutlined onClick={toggleLike} className="icon-like" />
            )}
          </Tooltip>
          <Tooltip title="Comment">
            <MessageOutlined className="icon-comment" />
          </Tooltip>
          <Tooltip title="Share">
            <SendOutlined className="icon-share" />
          </Tooltip>
        </Space>
      </div>
      {/* meta */}
      <div className="feed-meta">
        <Text strong>{likes} likes</Text>
        {caption && (
          <div style={{ marginTop: 6 }}>
            <Text strong>{author} </Text>
            <Text>{caption}</Text>
          </div>
        )}
      </div>
      <Divider style={{ margin: "8px 0 0" }} />
      {/* comments */}
      <div className="feed-comments">
        {comments.length > 0 && (
          <List
            size="small"
            dataSource={comments}
            renderItem={(c) => (
              <List.Item style={{ padding: "6px 0" }}>
                <Text strong style={{ marginRight: 6 }}>
                  {c.author}
                </Text>
                <Text>{c.text}</Text>
              </List.Item>
            )}
          />
        )}

        <div className="feed-add-comment">
          <Input
            placeholder="Add a comment…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onPressEnter={addComment}
            suffix={
              <SendOutlined
                onClick={addComment}
                style={{ color: draft.trim() ? "#1677ff" : "#bbb" }}
              />
            }
          />
        </div>
      </div>
    </Card>
  );
}
