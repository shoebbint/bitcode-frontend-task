import { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed

const Home = () => {
    const [initialData, setInitialData] = useState([]); // State to hold initial data from API on load
    const [reportData, setReportData] = useState([]); // State to hold the report data

    // Fetch initial data when the component mounts
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Call the endpoint to create the DB and fetch data
                const response = await axios.get('https://bitcode-task2-server.vercel.app/api/fetchdata');
                setInitialData(response.data); // Set the initial data to state
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData(); // Call the function to fetch initial data
    }, []); // Empty dependency array means this effect runs once on mount

    const handleTask2Click = async () => {
        try {
            // Call your endpoint for report generation
            const response = await axios.get('https://bitcode-task2-server.vercel.app/api/reports');
            setReportData(response.data); // Set the report data to state
        } catch (error) {
            console.error('Error generating report:', error);
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

            {/* Display report data in a table if available */}
            {reportData.length > 0 && (
                <div className="overflow-x-auto mt-10">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">Product Name</th>
                                <th className="border border-gray-200 px-4 py-2">Customer Name</th>
                                <th className="border border-gray-200 px-4 py-2">Quantity</th>
                                <th className="border border-gray-200 px-4 py-2">Price</th>
                                <th className="border border-gray-200 px-4 py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-2">{item.ProductName}</td>
                                    <td className="border border-gray-200 px-4 py-2">{item.CustomerName}</td>
                                    <td className="border border-gray-200 px-4 py-2">{item.Quantity}</td>
                                    <td className="border border-gray-200 px-4 py-2">{item.Price.toFixed(2)}</td>
                                    <td className="border border-gray-200 px-4 py-2">{item.Total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Home;
