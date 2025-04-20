import React, { useEffect, useState } from "react";
import { fetchApplicationAnalytics } from '../services/analisticsService';
import "../styles/tables.css";

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const response = await fetchApplicationAnalytics();
                setAnalytics(response.data);  
            } catch (err) {
                setError("Failed to fetch analytics data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
    
        loadAnalytics();
    }, []);
    

    if (loading) return <p>Loading analytics data...</p>;
    if (error) return <p>{error}</p>;
    if (!analytics) return <p>No analytics data available.</p>;

    return (
        <div className="analytics-container">
            <h2>Application Analytics</h2>
            <div className="analytics-item">
                <h3>Posts</h3>
                <p><strong>Posts in last week:</strong> {analytics.numberOfPostByWeek}</p>
                <p><strong>Posts in last month:</strong> {analytics.numberOfPostByMonth}</p>
                <p><strong>Posts in last year:</strong> {analytics.numberOfPostByYear}</p>
            </div>
            <div className="analytics-item">
                <h3>Comments</h3>
                <p><strong>Comments in last week:</strong> {analytics.numberOfCommentByWeek}</p>
                <p><strong>Comments in last month:</strong> {analytics.numberOfCommentByMonth}</p>
                <p><strong>Comments in last year:</strong> {analytics.numberOfCommentByYear}</p>
            </div>
            <div className="analytics-item">
                <h3>Users</h3>
                <p><strong>Users with Posts:</strong> {analytics.countUserWithPostLong}</p>
                <p><strong>Users with Comments:</strong> {analytics.countUserWithCommentLong}</p>
                <p><strong>Total Users:</strong> {analytics.totalUsers}</p> {/* Display total users */}
                <p><strong>Users with Zero Activity:</strong> {analytics.usersWithZeroActivityLong}</p>
            </div>
            <div className="analytics-item">
                <h3>Activity Percentage</h3>
                <p><strong>Users with Posts Percentage:</strong> {analytics.percentUserWithPost}%</p>
                <p><strong>Users with Comments Percentage:</strong> {analytics.percentUserWithComment}%</p>
                <p><strong>Users with Zero Activity Percentage:</strong> {analytics.percentUsersWithZeroActivity}%</p>
            </div>
        </div>
    );
};

export default Analytics;
