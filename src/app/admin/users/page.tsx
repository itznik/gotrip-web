'use client';
import { useState, useEffect } from 'react';
import { Shield, User, Trash2 } from 'lucide-react';

interface UserType {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  // We need a quick API to fetch users (We'll add this next)
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users'); 
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // Simple delete (Optional safety)
  const handleDelete = async (id: string) => {
    if(!confirm('Delete this user? This cannot be undone.')) return;
    try {
      await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch (err) { alert('Failed to delete'); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Manage Users</h1>
      
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading...</td></tr>
            ) : users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>
                      {user.role === 'admin' ? <Shield size={16} /> : <User size={16} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{user.username}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                   {/* Prevent deleting yourself or other admins for safety */}
                   {user.role !== 'admin' && (
                    <button onClick={() => handleDelete(user._id)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
