import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Activating your account...");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/activate/${token}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setMessage("Account activated successfully! Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          const errorText = await response.text();
          setMessage(errorText || "Invalid or expired token!");
        }
      } catch (error) {
        setMessage("Error activating account. Please try again later.");
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default ActivateAccount;