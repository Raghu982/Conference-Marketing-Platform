import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  Edit2,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/userService";

type Role =
  | "Admin"
  | "Manager"
  | "Staff";

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};

const roleOptions: Role[] = [
  "Admin",
  "Manager",
  "Staff",
];

const emptyForm = {
  name: "",
  email: "",
  role: "Staff" as Role,
};

function getRoleBadgeClass(role: Role) {
  if (role === "Admin") {
    return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300";
  }

  if (role === "Manager") {
    return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300";
  }

  return "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300";
}

export default function Users() {
  const [search, setSearch] =
    useState("");

  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [
    showCreateModal,
    setShowCreateModal,
  ] = useState(false);

  const [createForm, setCreateForm] =
    useState(emptyForm);

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<User | null>(null);

  const [editForm, setEditForm] =
    useState(emptyForm);

  const totalUsers =
    users.length;

  const adminCount =
    users.filter(
      (user) => user.role === "Admin"
    ).length;

  const managerCount =
    users.filter(
      (user) => user.role === "Manager"
    ).length;

  const staffCount =
    users.filter(
      (user) => user.role === "Staff"
    ).length;

  const loadUsers = async () => {
    try {
      const data =
        await getUsers();

      setUsers(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openCreateModal = () => {
    setCreateForm(emptyForm);
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    if (saving) return;

    setShowCreateModal(false);
    setCreateForm(emptyForm);
  };

  const openEditModal = (
    user: User
  ) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const closeEditModal = () => {
    if (saving) return;

    setSelectedUser(null);
    setEditForm(emptyForm);
  };

  const handleCreateUser = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    const name =
      createForm.name.trim();
    const email =
      createForm.email.trim();

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSaving(true);

      await createUser({
        name,
        email,
        role: createForm.role,
      });

      setShowCreateModal(false);
      setCreateForm(emptyForm);

      await loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateUser = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (!selectedUser) return;

    const name =
      editForm.name.trim();
    const email =
      editForm.email.trim();

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSaving(true);

      await updateUser(
        selectedUser.id,
        {
          name,
          email,
          role: editForm.role,
        }
      );

      setSelectedUser(null);
      setEditForm(emptyForm);

      await loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
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

  const filteredUsers =
    users.filter((user) => {
      const query =
        search.toLowerCase();

      return (
        user.name
          .toLowerCase()
          .includes(query) ||
        user.email
          .toLowerCase()
          .includes(query)
      );
    });

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="mb-6 text-3xl font-bold">
          User Management
        </h1>

        <div className="rounded-lg bg-white p-8 shadow dark:bg-slate-900">
          <p className="text-lg">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">
          User Management
        </h1>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
        >
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-5 shadow dark:bg-slate-900">
          <h3 className="text-sm text-gray-500">
            Total Users
          </h3>

          <p className="text-3xl font-bold">
            {totalUsers}
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 shadow dark:bg-slate-900">
          <h3 className="text-sm text-gray-500">
            Admins
          </h3>

          <p className="text-3xl font-bold text-red-500">
            {adminCount}
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 shadow dark:bg-slate-900">
          <h3 className="text-sm text-gray-500">
            Managers
          </h3>

          <p className="text-3xl font-bold text-blue-500">
            {managerCount}
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 shadow dark:bg-slate-900">
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
        onChange={(event) =>
          setSearch(event.target.value)
        }
        className="mb-6 w-full max-w-md rounded-lg border px-4 py-2 dark:border-slate-700 dark:bg-slate-950"
      />

      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-slate-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map(
                  (user) => (
                    <tr
                      key={user.id}
                      className="border-t border-slate-200 dark:border-slate-800"
                    >
                      <td className="p-4 font-medium">
                        {user.name}
                      </td>

                      <td className="p-4">
                        {user.email}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRoleBadgeClass(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(user)
                            }
                            className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                          >
                            <Edit2 size={15} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(user.id)
                            }
                            className="inline-flex items-center gap-2 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleCreateUser}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">
                Create User
              </h2>

              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close create user modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={createForm.name}
                onChange={(event) =>
                  setCreateForm({
                    ...createForm,
                    name: event.target.value,
                  })
                }
                className="w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
              />

              <input
                type="email"
                placeholder="Email"
                value={createForm.email}
                onChange={(event) =>
                  setCreateForm({
                    ...createForm,
                    email: event.target.value,
                  })
                }
                className="w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
              />

              <select
                value={createForm.role}
                onChange={(event) =>
                  setCreateForm({
                    ...createForm,
                    role: event.target.value as Role,
                  })
                }
                className="w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
              >
                {roleOptions.map((role) => (
                  <option
                    key={role}
                    value={role}
                  >
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded-lg border px-4 py-2 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving
                  ? "Creating..."
                  : "Create User"}
              </button>
            </div>
          </form>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={handleUpdateUser}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">
                Edit User
              </h2>

              <button
                type="button"
                onClick={closeEditModal}
                className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close edit user modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={editForm.name}
                onChange={(event) =>
                  setEditForm({
                    ...editForm,
                    name: event.target.value,
                  })
                }
                className="w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
              />

              <input
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={(event) =>
                  setEditForm({
                    ...editForm,
                    email: event.target.value,
                  })
                }
                className="w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
              />

              <select
                value={editForm.role}
                onChange={(event) =>
                  setEditForm({
                    ...editForm,
                    role: event.target.value as Role,
                  })
                }
                className="w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
              >
                {roleOptions.map((role) => (
                  <option
                    key={role}
                    value={role}
                  >
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg border px-4 py-2 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving
                  ? "Updating..."
                  : "Update User"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
