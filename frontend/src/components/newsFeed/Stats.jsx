import React from "react";

const statsData = [
  { label: "Posts", value: 6 },
  { label: "Followers", value: 16 },
  { label: "Following", value: 26 },
  { label: "Communities", value: 36 },
];

export default function Stats() {
  return (
    <div className=" h-full grid grid-cols-2 md:grid-cols-4 gap-4 border-[#51A2FF] border p-4 items-center rounded-xl">
      {statsData?.map((stats, index) => (
        <div key={index} className="flex flex-col items-center">
          <p className="border border-[#51A2FF] w-fit px-4 py-1 text-xs rounded-md">
            {stats?.value}
          </p>
          <p className="text-xs mt-1">{stats?.label}</p>
        </div>
      ))}
    </div>
  );
}
