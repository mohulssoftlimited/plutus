import React from "react";

export default function ProfileCard() {
  return (
    <div className="grid grid-cols-12 gap-4 border-[#51A2FF] border p-4 items-center rounded-xl">
      <div className="col-span-12 md:col-span-3">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>
      <div className="col-span-12 md:col-span-9 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 items-center">
          <p>Mike Adams</p>
          <p className="text-slate-400 text-sm">@mikeadams</p>
          <p className="bg-[#51A2FF] w-fit px-4 py-1 text-xs rounded-md">
            Level 2
          </p>
        </div>
        <button
          className={`px-4 py-1 max-w-[150px] cursor-pointer text-sm font-medium border  rounded-xl border-[#51A2FF] text-[#51A2FF]`}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
