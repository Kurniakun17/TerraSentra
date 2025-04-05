import React from "react";
import useGreenBondStore from "../../store/greenBondStore";

export default function AboutGreenBond({
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpaasperiores quia, modi minus libero voluptate at quis mollitia expeditain dolore cumque quae possimus autem aperiam suscipit cum quaeratmaiores.",
}) {
  const { bondDetail } = useGreenBondStore();
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        About the Project
      </h2>
      <p>{bondDetail.description} </p>
    </div>
  );
}
