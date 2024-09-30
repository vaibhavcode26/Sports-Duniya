import { useState, useEffect } from "react";
import { dummyColleges } from "./JSON";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

function CollegeTable() {
  const [colleges, setColleges] = useState([]);
  const [visibleColleges, setVisibleColleges] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  

  useEffect(() => {
    setColleges(dummyColleges);
  }, []);

  // Filter based on search term
  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;
      if (bottom) {
        setVisibleColleges((prev) => prev + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const sortByFees = () => {
    const sortedColleges = [...colleges].sort((a, b) => a.fees - b.fees);
    setColleges(sortedColleges);
  };

  const sortByReviews = () => {
    const sortedColleges = [...colleges].sort(
      (a, b) => b.userReviews - a.userReviews
    );
    setColleges(sortedColleges);
  };

  // In the UI, add buttons:

  return (
    <div className="p-4">
      <div className=" flex gap-2 justify-between">
        <div className="mb-4 w-full">
          <input
            type="text"
            placeholder="Search college"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 mb-4 w-full">
          <button
            onClick={sortByFees}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
          >
            Sort by Fees
          </button>
          <button
            onClick={sortByReviews}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none"
          >
            Sort by Reviews
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 ">
        <thead>
          <tr className=" bg-blue-400 text-white">
            <th className="py-6 px-4 border-b text-left ">CD rank</th>
            <th className="py-2 px-4 border-b text-left">Colleges</th>
            <th className="py-2 px-4 border-b text-left">Course Fees</th>
            <th className="py-2 px-4 border-b text-left">Placement</th>
            <th className="py-2 px-4 border-b text-left">User Reviews</th>
            <th className="py-2 px-4 border-b text-left">Ranking</th>
          </tr>
        </thead>
        <tbody>
          {filteredColleges.slice(0, visibleColleges).map((college, index) => (
            <tr key={college.id} className="hover:bg-gray-50">
              <td className="py-12 px-4 border-b">{index + 1}</td>
              <td className="py-12 px-4 border-b text-xl text-blue-500 font-bold flex gap-1">
                <img src="https://upload.wikimedia.org/wikipedia/sa/6/66/IIT_Delhi_logo.png" className=" h-10 w-10 " alt="" />
                {college.name}{" "}
                {college.featured && (
                  <span className="text-white font-bold ml-2 bg bg-red-500 p-1 rounded-lg">Featured</span>
                )}
              </td>
              <td className="py-12 px-4 border-b text-xl text-blue-500 font-bold">₹{college.fees}</td>
              <td className="py-12 px-4 border-b text-xl text-blue-500 font-bold">₹{college.placement}</td>
              <td className="py-12 px-4 border-b text-xl text-yellow-500 font-bold">{college.userReviews} / 10</td>
              <td className="py-12 px-4 border-b text-xl text-blue-500 font-bold">
                #{college.ranking} in India
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
}

export default CollegeTable;