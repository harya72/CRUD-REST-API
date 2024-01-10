import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: "",
    email: "",
    age: "",
    image:"",
  });

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      alert("Error fetching Data")
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDataWithDelay = () => {
      setTimeout(() => {
        fetchData();
      }, 1000); // 2 seconds delay
    };

    fetchDataWithDelay();
  }, []);

  const handleEditClick = (userId, userData) => {
    setEditingUserId(userId);
    setUpdatedUserData(userData);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setUpdatedUserData({
      name: "",
      email: "",
      age: "",
    });
  };

  const handleInputChange = (e, field) => {
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSaveEdit = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        console.log(`User with id ${userId} updated successfully!`);
        setEditingUserId(null);
        fetchData();
      } else {
        console.log("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`User with id ${userId} deleted successfully!`);
        fetchData();
      } else {
        console.log("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center font-extrabold h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="bg-black">
      <section className="container bg-black border border-cyan-50 rounded-xl">
        {(users ?? []).length === 0 ? (
          <p>No users to display</p>
        ) : (
          users.map((user) => {
            const isEditing = editingUserId === user.id;

            return (
              <article className="text-white" key={user.email}>
                {isEditing ? (
                  <div className=" w-full mb-5">
                    <div>
                      <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor={`name-${user.id}`}
                      >
                        Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`name-${user.id}`}
                        type="text"
                        placeholder="Username"
                        value={updatedUserData.name}
                        onChange={(e) => handleInputChange(e, "name")}
                        required
                      />
                    </div>

                    <div>
                      <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor={`email-${user.id}`}
                      >
                        Email
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`email-${user.id}`}
                        type="email"
                        placeholder="Email"
                        value={updatedUserData.email}
                        onChange={(e) => handleInputChange(e, "email")}
                        required
                      />
                    </div>

                    <div>
                      <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor={`age-${user.id}`}
                      >
                        Age
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`age-${user.id}`}
                        type="number"
                        placeholder="Age"
                        value={updatedUserData.age}
                        onChange={(e) => handleInputChange(e, "age")}
                        required
                      />
                    </div>
                    <div className="flex">
                      <button
                        className="px-4 py-2 bg-black text-white rounded transition-all hover:bg-gray-800 hover:shadow-md"
                        onClick={() => handleSaveEdit(user.id)}
                      >
                        Save
                      </button>
                      <div className="m-5"></div>

                      <button
                        className="px-4 py-2 bg-black text-white rounded transition-all hover:bg-gray-800 hover:shadow-md"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full">
                    {/* <div className="m-3">
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    </div> */}
                    

                    <div>
                      <h4>{user.name}</h4>
                      <h5>{user.email}</h5>
                      <p>{user.age} years</p>
                    </div>
                    <div className="flex w-full justify-end">
                      <span style={{ marginRight: "10px" }}>
                        <button onClick={() => handleEditClick(user.id, user)}>
                          <FaEdit /> {/* Edit icon */}
                        </button>
                      </span>
                      <span>
                        <button onClick={() => handleDelete(user.id)}>
                          <FaTrash /> {/* Delete icon */}
                        </button>
                      </span>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </section>
    </main>
  );
};

export default Main;
