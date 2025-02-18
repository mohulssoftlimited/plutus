import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import NewsFeedTab from "../components/newsFeed/NewsFeedTab";
import ProfileCard from "../components/newsFeed/ProfileCard";
import Stats from "../components/newsFeed/Stats";
import PostTabs from "../components/newsFeed/PostTabs";
import PostCard from "../components/newsFeed/PostCard";
import Community from "../components/newsFeed/Community";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-2">
          <div className="sticky top-0 col-span-12 md:col-span-2 md:h-screen shadow  rounded p-4  border-gray-800">
            <NewsFeedTab></NewsFeedTab>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-12 md:col-span-6">
                <ProfileCard />
              </div>
              <div className="col-span-12 md:col-span-6">
                <Stats />
              </div>
              <div className="col-span-12 my-6">
                <textarea
                  name="post"
                  id="post"
                  rows={6}
                  placeholder="What's on your mind...?"
                  className="text-sm text-slate-400 p-4 w-full border border-[#51A2FF] rounded-xl"
                ></textarea>
                <div className="flex justify-end mt-3">
                  <button className="bg-[#51A2FF] px-6 py-1 rounded-md text-sm">
                    Post
                  </button>
                </div>
              </div>
              <div className="col-span-12">
                <PostTabs />
                <div className="mt-4">
                  <PostCard />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-2 md:h-screen shadow  rounded p-4 border-gray-800 sticky top-0">
            <Community />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
