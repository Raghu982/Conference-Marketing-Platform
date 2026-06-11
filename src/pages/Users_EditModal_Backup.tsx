import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../services/userService";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function Users() {
  const [search, setSearch] =
    useState("");

  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // Create User Modal
  // =========================

  const [
    showCreateModal,
    setShowCreateModal,
  ] = useState(false);

  const [newName, setNewName] =
    useState("");

  const [newEmail, setNewEmail] =
    useState("");

  const [newRole, setNewRole] =
    useState("Staff");
    // =========================
// Edit User Modal
// =========================

const [
  showEditModal,
  setShowEditModal,
] = useState(false);

const [
  selectedUser,
  setSelectedUser,
] = useState<User | null>(null);

const [editName, setEditName] =
  useState("");

const [editEmail, setEditEmail] =
  useState("");

const [editRole, setEditRole] =
  useState("Staff");

   // =========================
  // Statistics
  // =========================

  const totalUsers =
    users.length;

  const adminCount =
    users.filter(
      (user) =>
        user.role === "Admin"
    ).length;

  const managerCount =
    users.filter(
      (user) =>
        user.role === "Manager"
    ).length;

  const staffCount =
    users.filter(
      (user) =>
        user.role === "Staff"
    ).length;

  const loadUsers = async () => {
    try {
      const data =
        await getUsers();

      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

const handleCreateUser = async () => {
  try {
    if (!newName || !newEmail) {
      alert("Please fill all fields");
      return;
    }

    await createUser({
      name: newName,
      email: newEmail,
      role: newRole,
    });

    setShowCreateModal(false);

    setNewName("");
    setNewEmail("");
    setNewRole("Staff");

    await loadUsers();
  } catch (error) {
    console.error(error);

    alert("Failed to create user");
  }
};

const handleEdit = (
  user: User
) => {
  console.log("EDIT CLICKED", user);
  setSelectedUser(user);

  setEditName(user.name);

  setEditEmail(user.email);

  setEditRole(user.role);

  setShowEditModal(true);
};

const handleUpdateUser =
  async () => {
    if (!selectedUser)
      return;

    try {
      await updateUser(
        selectedUser.id,
        {
          name: editName,
          email: editEmail,
          role: editRole,
        }
      );

      setShowEditModal(false);

      setSelectedUser(null);

      await loadUsers();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update user"
      );
    }
  };

const handleDelete = async (
  id: number
) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) return;

  try {
    await deleteUser(id);

    await loadUsers();
  } catch (error) {
    console.error(error);

    alert("Failed to delete user");
  }
};

const filteredUsers = users.filter(
  (user) =>
    user.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    user.email
      .toLowerCase()
      .includes(search.toLowerCase())
);

  if (loading) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-5">
          <h3 className="text-sm text-gray-500">
            Total Users
          </h3>

          <p className="text-3xl font-bold">
            ...
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-5">
          <h3 className="text-sm text-gray-500">
            Admins
          </h3>

          <p className="text-3xl font-bold text-red-500">
            ...
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-5">
          <h3 className="text-sm text-gray-500">
            Managers
          </h3>

          <p className="text-3xl font-bold text-blue-500">
            ...
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-5">
          <h3 className="text-sm text-gray-500">
            Staff
          </h3>

          <p className="text-3xl font-bold text-green-500">
            ...
          </p>
        </div>

      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-8">
        <p className="text-lg">
          Loading users...
        </p>
      </div>
    </div>
  );
}

 return (
  <div className="p-8">
    <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    User Management
  </h1>

  <button
  onClick={() =>
  setShowCreateModal(true)
}
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
>
  + Add User
</button>
</div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-5">
        <h3 className="text-sm text-gray-500">
          Total Users
        </h3>

        <p className="text-3xl font-bold">
          {totalUsers}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-5">
        <h3 className="text-sm text-gray-500">
          Admins
        </h3>

        <p className="text-3xl font-bold text-red-500">
          {adminCount}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-5">
        <h3 className="text-sm text-gray-500">
          Managers
        </h3>

        <p className="text-3xl font-bold text-blue-500">
          {managerCount}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-5">
        <h3 className="text-sm text-gray-500">
          Staff
        </h3>

        <p className="text-3xl font-bold text-green-500">
          {staffCount}
        </p>
      </div>

    </div>

    <input
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
      className="border rounded-lg px-4 py-2 mb-6 w-full max-w-md"
    />

    {/* Rest of your table code continues below */}

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Role
              </th>

              <th className="text-left p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
  {filteredUsers.length === 0 ? (
    <tr>
      <td
        colSpan={4}
        className="p-6 text-center"
      >
        No users found
      </td>
    </tr>
  ) : (
    filteredUsers.map((user) => (
      <tr
        key={user.id}
        className="border-t"
      >
        <td className="p-4">
          {user.name}
        </td>

        <td className="p-4">
          {user.email}
        </td>

        <td className="p-4">
          {user.role}
        </td>

        <td className="p-4 space-x-2">
         <button
  onClick={() =>
    handleEdit(user)
  }
  className="px-3 py-1 bg-blue-600 text-white rounded"
>
  Edit
</button>

          <button
            onClick={() =>
              handleDelete(user.id)
            }
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-4">
              Create User
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                value={newName}
                onChange={(e) =>
                  setNewName(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={(e) =>
                  setNewEmail(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-3 py-2"
              />

              <select
                value={newRole}
                onChange={(e) =>
                  setNewRole(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="Admin">
                  Admin
                </option>

                <option value="Manager">
                  Manager
                </option>

                <option value="Staff">
                  Staff
                </option>
              </select>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setShowCreateModal(
                    false
                  )
                }
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
  onClick={
    handleCreateUser
  }
  className="px-4 py-2 bg-green-600 text-white rounded-lg"
>
  Create User
</button>

{showEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

    <div className="bg-white dark:bg-slate-900 rounded-lg p-6 w-full max-w-md">

      <h2 className="text-2xl font-bold mb-4">
        Edit User
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          value={editName}
          onChange={(e) =>
            setEditName(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="email"
          value={editEmail}
          onChange={(e) =>
            setEditEmail(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-3 py-2"
        />

        <select
          value={editRole}
          onChange={(e) =>
            setEditRole(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="Admin">
            Admin
          </option>

          <option value="Manager">
            Manager
          </option>

          <option value="Staff">
            Staff
          </option>
        </select>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() =>
            setShowEditModal(
              false
            )
          }
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={
            handleUpdateUser
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Update User
        </button>

      </div>

    </div>

  </div>
)}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

