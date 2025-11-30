import React from "react";
import { Button } from "./ui/button";

function Historytable() {
  const histories = [
    {
      id: 1,
      topic: "Mathematics Fundamentals",
      lastTotalScore: 85,
      createdAt: "2025-01-10",
      action: "view",
    },
    {
      id: 2,
      topic: "Computer Programming Basics",
      lastTotalScore: 92,
      createdAt: "2025-01-11",
      action: "view",
    },
    {
      id: 3,
      topic: "Information Assurance",
      lastTotalScore: 78,
      createdAt: "2025-01-12",
      action: "view",
    },
    {
      id: 4,
      topic: "System Analysis and Design",
      lastTotalScore: 88,
      createdAt: "2025-01-13",
      action: "review",
    },
    {
      id: 5,
      topic: "Data Structures",
      lastTotalScore: 95,
      createdAt: "2025-01-14",
      action: "view",
    },
    {
      id: 6,
      topic: "Database Management",
      lastTotalScore: 80,
      createdAt: "2025-01-15",
      action: "view",
    },
    {
      id: 7,
      topic: "Networking Concepts",
      lastTotalScore: 90,
      createdAt: "2025-01-16",
      action: "review",
    },
    {
      id: 8,
      topic: "Object-Oriented Programming",
      lastTotalScore: 93,
      createdAt: "2025-01-17",
      action: "view",
    },
    {
      id: 9,
      topic: "Web Development Basics",
      lastTotalScore: 87,
      createdAt: "2025-01-18",
      action: "view",
    },
    {
      id: 10,
      topic: "AI Fundamentals",
      lastTotalScore: 97,
      createdAt: "2025-01-19",
      action: "review",
    },
    {
      id: 11,
      topic: "Mathematics Fundamentals",
      lastTotalScore: 85,
      createdAt: "2025-01-10",
      action: "view",
    },
    {
      id: 12,
      topic: "Computer Programming Basics",
      lastTotalScore: 92,
      createdAt: "2025-01-11",
      action: "view",
    },
    {
      id: 13,
      topic: "Information Assurance",
      lastTotalScore: 78,
      createdAt: "2025-01-12",
      action: "view",
    },
    {
      id: 14,
      topic: "System Analysis and Design",
      lastTotalScore: 88,
      createdAt: "2025-01-13",
      action: "review",
    },
    {
      id: 15,
      topic: "Data Structures",
      lastTotalScore: 95,
      createdAt: "2025-01-14",
      action: "view",
    },
    {
      id: 16,
      topic: "Database Management",
      lastTotalScore: 80,
      createdAt: "2025-01-15",
      action: "view",
    },
    {
      id: 17,
      topic: "Networking Concepts",
      lastTotalScore: 90,
      createdAt: "2025-01-16",
      action: "review",
    },
    {
      id: 18,
      topic: "Object-Oriented Programming",
      lastTotalScore: 93,
      createdAt: "2025-01-17",
      action: "view",
    },
    {
      id: 19,
      topic: "Web Development Basics",
      lastTotalScore: 87,
      createdAt: "2025-01-18",
      action: "view",
    },
    {
      id: 20,
      topic: "AI Fundamentals",
      lastTotalScore: 97,
      createdAt: "2025-01-19",
      action: "review",
    },
  ];

  return (
    <div className="p-3">
      <div className="overflow-y-auto rounded-xl shadow-lg max-h-[600px] border border-gray-300">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-900 text-white sticky top-0 z-10">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Topic</th>
              <th className="p-3">Last Score</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {histories.map((history) => (
              <tr
                key={history.id}
                className="border-b border-gray-300 text-[#fed330] hover:bg-[#34495e] transition"
              >
                <td className="p-3">{history.id}</td>
                <td className="p-3">{history.topic}</td>
                <td className="p-3">{history.lastTotalScore} / 100</td>
                <td className="p-3">{history.createdAt}</td>
                <td className="p-3 font-semibold">
                  <Button
                    size="sm"
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Try Again
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Historytable;
