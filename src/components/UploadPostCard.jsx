import React, { useState } from "react";
import { Card, Form, Input, Button, Upload, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

export default function UploadPostCard({ onCreate }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleUploadChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const submit = async (vals) => {
    if (fileList.length === 0) {
      message.error("Please upload an image first!");
      return;
    }

    setSubmitting(true);
    // simulate upload delay
    await new Promise((r) => setTimeout(r, 400));

    const localImage = fileList[0].thumbUrl; // local preview URL

    onCreate?.({
      id: Date.now(),
      author: "you",
      avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=you",
      time: "now",
      image: localImage,
      caption: vals.caption,
      likes: 0,
      comments: [],
    });

    message.success("Post uploaded 🎉");
    setSubmitting(false);
    setFileList([]);
    form.resetFields();
  };

  return (
    <Card className="plantly-card" styles={{ body: { padding: 20 } }}>
      <Text strong style={{ fontSize: 16 }}>
        Upload a post
      </Text>

      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 12 }}
        onFinish={submit}
      >
        {/* Upload Section */}
        <Form.Item label="Photo">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // prevent auto upload
            maxCount={1}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Caption Section */}
        <Form.Item label="Caption" name="caption">
          <TextArea
            placeholder="Say something nice…"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={submitting} block>
          Post
        </Button>
      </Form>
    </Card>
  );
}
