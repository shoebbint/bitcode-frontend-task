import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed

const Home = () => {
  const [reportData, setReportData] = useState([]); // State to hold the report data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch initial data when the component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Call the endpoint to create the DB (no need to handle the response)
        await axios.get("https://bitcode-task2-server.vercel.app/api/fetchdata");
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData(); // Call the function to fetch initial data
  }, []); // Empty dependency array means this effect runs once on mount

  const handleTask2Click = async () => {
    setLoading(true); // Start loading
    setError(""); // Reset any previous error
    setReportData([]); // Clear previous report data

    try {
      // Call your endpoint for report generation
      const response = await axios.get("https://bitcode-task2-server.vercel.app/api/reports");

      console.log("Response data:", response.data); // Check the response data in the console

      // Set the report data to state using the 'report' key from the response
      if (response.data && response.data.report) {
        setReportData(response.data.report); // Set the report data to state
      } else {
        console.warn(
          "Expected an object with a report array, but received:",
          response.data
        );
        setError("Invalid data format received from the API");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      setError("Failed to generate report"); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-auto flex flex-col items-center">
      <div className="mx-auto my-10 flex justify-center items-center">
        <a href="https://4ex64xsj.forms.app/teacher-application-form">
          <button className="btn btn-wide me-10 btn-accent">Task 1</button>
        </a>
        <button className="btn btn-wide btn-warning" onClick={handleTask2Click}>
          Task 2 <br /> Generate report
        </button>
      </div>

      {/* Display error message if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading state indicator */}
      {loading ? (
        <p>Loading report data...</p>
      ) : (
        <>
          {/* Display report data in a table if available */}
          {reportData.length > 0 ? (
            <div className="overflow-x-auto mt-10">
                <h1 className="text-center text-3xl font-bold">Generated table</h1>
              <table className="min-w-full border-collapse border border-gray-200 my-20">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2">
                      Product Name
                    </th>
                    <th className="border border-gray-200 px-4 py-2">
                      Customer Name
                    </th>
                    <th className="border border-gray-200 px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Price</th>
                    <th className="border border-gray-200 px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">
                        {item.ProductName || "N/A"}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.CustomerName || "N/A"}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.Quantity || "N/A"}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.Price || "N/A"}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.Total || "N/A"}
                      </td>
                    </tr>
                  ))}
                  {/* Gross Total Row */}
                  <tr className="font-bold bg-gray-100">
                    <td className="border border-gray-200 px-4 py-2">
                      Gross Total:
                    </td>
                    <td className="border border-gray-200 px-4 py-2">N/A</td>
                    <td className="border border-gray-200 px-4 py-2">
                      {reportData.reduce(
                        (sum, item) => sum + (Number(item.Quantity) || 0),
                        0
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {reportData
                        .reduce(
                          (sum, item) => sum + (Number(item.Price) || 0),
                          0
                        )
                        .toFixed(2)}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {reportData
                        .reduce(
                          (sum, item) => sum + (Number(item.Total) || 0),
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>No report data available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
