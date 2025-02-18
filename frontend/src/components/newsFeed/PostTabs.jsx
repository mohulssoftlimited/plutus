import React, { useState } from "react";

const tabs = [
  { name: "Following", key: "following" },
  { name: "For You", key: "forYou" },
  { name: "Trending", key: "trending" },
];

export default function PostTabs() {
  const [activeTab, setActiveTab] = useState("following");
  return (
    <div>
      <div className="flex gap-4 ">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1 cursor-pointer text-sm font-medium  transition-colors rounded duration-200 ${
              activeTab === tab.key
                ? "bg-[#51A2FF]"
                : "text-[#51A2FF] "
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
}
