import React from "react";
import { FcLike, FcComments, FcShare, FcDatabase } from "react-icons/fc";

const posts = [
  {
    userImage: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Mike Adams",
    username: "@mikeadams",
    lastEdited: "1 hour ago",
    level: "Level 2",
    publishedAt: "22h 20min ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    likes: 100,
    comments: 20,
    dislikes: 5,
  },
  {
    userImage: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Mike Adams",
    username: "@mikeadams",
    lastEdited: "1 hour ago",
    level: "Level 2",
    publishedAt: "22h 20min ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    likes: 100,
    comments: 20,
    dislikes: 5,
  },
  {
    userImage: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Mike Adams",
    username: "@mikeadams",
    lastEdited: "1 hour ago",
    level: "Level 2",
    publishedAt: "22h 20min ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    likes: 100,
    comments: 20,
    dislikes: 5,
  },
  {
    userImage: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Mike Adams",
    username: "@mikeadams",
    lastEdited: "1 hour ago",
    level: "Level 2",
    publishedAt: "22h 20min ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    likes: 100,
    comments: 20,
    dislikes: 5,
  },
];

export default function PostCard() {
  return (
    <>
      {posts.map((post, index) => (
        <div className="mb-8" key={index}>
          <div className="bg-[#1E2939] text-xs p-4 rounded-md" key={index}>
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2 items-center flex-grow ">
                <img
                  src={post.userImage}
                  alt="profile"
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div className="">
                  <p className="text-sm ">{post.name}</p>
                  <div className="flex flex-wrap gap-1 items-center">
                    <p className="text-slate-400 text-xs">{post.username}</p>
                    <p className="text-slate-400 text-xs">{post?.lastEdited}</p>
                    <p className="w-fit border-slate-600 border px-4 py-1 rounded-lg text-xs text-slate-300">
                      {post.level}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="w-fit border-slate-600 border px-4 py-1 rounded-lg text-xs text-slate-300">
                  {post?.publishedAt}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p>{post.content}</p>
            </div>
          </div>
          <div className="bg-[#1E2939] text-xs p-4 rounded-md flex flex-wrap items-center mt-0.5">
            <div className="flex items-center flex-grow gap-4 text-slate-400">
              <div className="flex items-center gap-1">
                <FcLike className="h-5 w-5" />
                <p>{post.likes}</p>
              </div>
              <div className="flex items-center gap-1">
                <FcComments className="h-5 w-5" />
                <p>{post.comments}</p>
              </div>
              <div className="flex items-center gap-1">
                <FcShare className="h-5 w-5" />
                <p>{post.dislikes}</p>
              </div>
            </div>
            <FcDatabase  className="h-5 w-5 cursor-pointer"/>
          </div>
        </div>
      ))}
    </>
  );
}
