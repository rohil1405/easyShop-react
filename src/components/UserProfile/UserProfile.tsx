import React, { useState, useEffect } from "react";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import "./UserProfile.scss";
import "../ProductData/loader.scss";
import loader from "../../assets/loader.png";
import { useNavigate } from "react-router-dom";
import { User, updateEmail } from "firebase/auth";

interface UserDetails {
  fullName: string;
  email: string;
  phonenumber: string;
}

const UserProfile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [formData, setFormData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      try {

        const response = await fetch(`https://easyshop-fe29c-default-rtdb.firebaseio.com/users.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch users data");
        }

        const data = await response.json();

        const userId = Object.keys(data).find((key) => data[key].email === user.email);

        if (userId && data[userId]) {
          setUserDetails(data[userId]);
          setFormData(data[userId]);
          setLoading(false);
        } else {
          toast.error("No user data found for the logged-in user", {
            position: "top-right",
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        toast.error("Error fetching user data", {
          position: "top-right",
        });
        setLoading(false);
      }
    } else {
      toast.error("User is not logged in", {
        position: "top-right",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handlePage = () => {
    navigate("/Home");
  };

  const handleUpdate = async () => {
    if (formData) {
      try {
        const user = auth.currentUser as User;

        if (user) {
          const response = await fetch(`https://easyshop-fe29c-default-rtdb.firebaseio.com/users/${user.uid}.json`, {
            method: "PATCH", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
              phonenumber: formData.phonenumber,
            }),
          });

          if (!response.ok) {
            throw new Error("Error updating user data");
          }
          if (formData.email !== user.email) {
            await updateEmail(user, formData.email);
            toast.success("Email updated successfully! Please log in again.", {
              position: "top-right",
            });
          } else {
            toast.success("Profile updated successfully", {
              position: "top-right",
            });
          }
        }
      } catch (error: any) {
        console.error("Error updating profile: ", error);
        toast.error("Error updating profile", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="profile-wrap">
      <div className="container">
        <div className="user-details">
          {loading ? (
            <div className="loader-container">
              <div className="loader">
                <img src={loader} alt="Loading..." />
                <span>Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {userDetails ? (
                <>
                  <h2>Welcome {userDetails.fullName}</h2>
                  <div className="details">
                    <input
                      type="text"
                      name="fullName"
                      value={formData?.fullName || ""}
                      placeholder="Full Name"
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData?.email || ""}
                      placeholder="Email"
                      onChange={handleChange}
                      disabled
                    />
                    <input
                      type="text"
                      name="phonenumber"
                      value={formData?.phonenumber || ""}
                      placeholder="Phone Number"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="cta-btn">
                    <button className="update-btn" onClick={handleUpdate}>
                      Update
                    </button>
                  </div>

                  <div className="cta-btn">
                    <button className="home-btn" onClick={handlePage}>
                      Visit Store
                    </button>
                  </div>
                </>
              ) : (
                <div>No user details found.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
