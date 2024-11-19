import React, { createContext, useState, useEffect } from "react";

// Create the UserContext to store userId and setUserId
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(""); // Store only userId

  // Fetch user profile on mount
  const fetchUserProfile = async () => {
    try {
      // Send request to server; the browser will automatically send the cookies
      const response = await fetch("http://localhost:4000/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This ensures cookies (including accessToken) are sent
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const userData = await response.json();
      setUserId(userData._id); // Set userId from response
      console.log("User data fetched successfully:", userData);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  // Refresh access token every 15 minutes (or any other interval as needed)
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await fetch("/refresh-token", {
          method: "POST",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId); // Update userId if token is refreshed
        }
      } catch (error) {
        console.error("Token refresh error:", error);
      }
    };

    const interval = setInterval(refreshAccessToken, 15 * 60 * 1000); // Refresh every 15 mins
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;