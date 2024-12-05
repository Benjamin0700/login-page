import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = () => {
    const adminPasswordFromStorage = 'adminparol'; 
    if (adminPassword === adminPasswordFromStorage) {
      setIsAdminAuthenticated(true);
    } else {
      alert('Invalid admin password');
    }
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleApprove = (email) => {
    const updatedUsers = users.map((user) => 
      user.email === email ? { ...user, approved: true } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); 
    alert(`${email} has been approved.`);
  };

  const handleDeny = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(`${email} has been denied.`);
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Enter Admin Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter Admin password"
              required
            />
          </div>
          <button
            onClick={handleAdminLogin}
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
          >
            Login as Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="flex justify-between items-center w-full max-w-4xl mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      <table className="bg-white w-full max-w-4xl shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.approved ? (
                  <span className="text-green-500 font-bold">Approved</span>
                ) : (
                  <span className="text-red-500 font-bold">Not Approved</span>
                )}
              </td>
              <td className="border px-4 py-2">
                {user.approved ? (
                  <span>Already Approved</span>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(user.email)}
                      className="bg-teal-500 text-white px-4 py-2 rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeny(user.email)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Deny
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
