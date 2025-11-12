import React, { useState } from "react";
import { Typography, Row, Col } from "antd";
import FeedCard from "../components/FeedCard";
import ProfileCard from "../components/ProfileCard";
import UploadPostCard from "../components/UploadPostCard";

const { Title } = Typography;

// quick mock data
const INITIAL_POSTS = [
  {
    id: 1,
    author: "plant.ly",
    avatar:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=80&q=80&auto=format&fit=crop",
    time: "2h",
    image:
      "https://images.squarespace-cdn.com/content/v1/5d1cf9bf0d895b0001c87f8a/5c94b866-fa53-4039-a3b0-10df7e378532/2021-03-27-082811342.jpg",
    caption: "Monstera looking extra glossy today 🌿✨",
    likes: 128,
    comments: [{ id: 11, author: "jamie", text: "gorgeous!" }],
  },
  {
    id: 2,
    author: "green.room",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=80&q=80&auto=format&fit=crop",
    time: "5h",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/strelitzia-nicolai-in-pot-next-to-a-couch-royalty-free-image-1731437978.jpg",
    caption: "Repotted the fiddle leaf — new soil mix is chef’s kiss 🌱",
    likes: 84,
    comments: [],
  },
  {
    id: 3,
    author: "succ.society",
    avatar:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=80&q=80&auto=format&fit=crop",
    time: "1d",
    image:
      "https://images.unsplash.com/photo-1643670915600-57e018da570e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWVzdGhldGljJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000",
    caption: "Succulent sunrise ☀️",
    likes: 201,
    comments: [{ id: 31, author: "you", text: "so cute!" }],
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const handleCreate = (post) => setPosts((prev) => [post, ...prev]);

  return (
    <div className="feed-frame">
      <div className="feed-title">
        <Title level={3} style={{ margin: 0 }}>
          Feed
        </Title>
      </div>

      <div className="feed-split">
        {/* LEFT: scrollable feed */}
        <div className="feed-scroll">
          {posts.map((p) => (
            <FeedCard
              key={p.id}
              author={p.author}
              avatar={p.avatar}
              time={p.time}
              image={p.image}
              caption={p.caption}
              initialLikes={p.likes}
              initialComments={p.comments}
            />
          ))}
          {/* bottom spacer so last card isn't glued to bottom edge */}
          <div style={{ height: 16 }} />
        </div>

        {/* RIGHT: fixed profile/compose */}
        <aside className="feed-profile-fixed">
          <ProfileCard />
          <UploadPostCard onCreate={handleCreate} />
        </aside>
      </div>
    </div>
  );
}
