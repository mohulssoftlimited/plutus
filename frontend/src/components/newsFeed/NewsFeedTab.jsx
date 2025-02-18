import React, { useState } from "react";
import { FcAbout, FcAddImage, FcHome } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcAssistant } from "react-icons/fc";


const tabList = [
  { icon:<FcHome className="h-5 w-5"/>,name: "Home", key: "home" },
  { icon:<FcSettings className="h-5 w-5"/>,name: "Notification", key: "notification" },
  { icon:<FcAssistant className="h-5 w-5"/>,name: "Profile", key: "profile" },
  { icon:<FcAbout className="h-5 w-5"/>,name: "Settings", key: "settings" },
  { icon:<FcAddImage className="h-5 w-5"/>,name: "Help", key: "help" },
];

export default function NewsFeedTab() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex flex-col gap-4 h-full" >
      {/* Tabs */}
      <div className="flex flex-col gap-4 flex-grow">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 flex items-center gap-2 cursor-pointer text-sm font-medium border transition-colors rounded-xl duration-200 ${
              activeTab === tab.key ? "border-[#51A2FF] text-[#51A2FF]" : "border-transparent text-gray-500"
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
}
