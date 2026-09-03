'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

// অ্যাক্সেস মডিউলগুলোর তালিকা (আপনার অ্যাপের ফিচার অনুযায়ী)
const ALL_PERMISSIONS = [
  { key: 'donors', label: 'দাতা ম্যানেজমেন্ট' },
  { key: 'requests', label: 'রক্তের অনুরোধ' },
  { key: 'donations', label: 'রক্তদান রেকর্ড' },
  { key: 'leaderboard', label: 'লিডারবোর্ড' },
  { key: 'messages', label: 'মেসেজ পাঠানো' },
];

export default function SuperAdminAdminsPage() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // নতুন Admin তৈরির ফর্ম স্টেট
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['donors', 'requests']);
  const [message, setMessage] = useState('');

  // Admin-দের তালিকা লোড করার ফাংশন
  const fetchAdmins = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, permissions')
      .eq('role', 'admin');
    
    if (!error) setAdmins(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // চেকবক্স টগল করার ফাংশন
  const togglePermission = (key: string) => {
    setSelectedPermissions(prev => 
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    );
  };

  // নতুন Admin তৈরি করার ফাংশন (API Route-এ কল করে)
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // এখন সরাসরি Supabase না ডেকে আমাদের API Route এ কল করব
    const response = await fetch('/api/admin/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        permissions: selectedPermissions
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage('❌ Admin তৈরি করা যায়নি: ' + data.error);
    } else {
      setMessage('✅ নতুন Admin সফলভাবে তৈরি হয়েছে!');
      setName(''); setEmail(''); setPassword('');
      setSelectedPermissions(['donors', 'requests']);
      fetchAdmins();
    }
    setLoading(false);
  };

  // Admin ডিলিট করার ফাংশন
  const handleDeleteAdmin = async (adminId: string) => {
    if (!confirm('আপনি কি নিশ্চিত এই Admin-কে ডিলিট করতে চান?')) return;

    // ১. Auth থেকে ডিলিট (সার্ভার সাইড API ব্যবহার করতে হবে)
    const response = await fetch(`/api/admin/delete?id=${adminId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const data = await response.json();
      alert('Auth ডিলিট করা যায়নি: ' + data.error);
      return;
    }

    // ২. profiles টেবিল থেকে ডিলিট
    await supabase.from('profiles').delete().eq('id', adminId);
    
    fetchAdmins();
  };

  // Admin-এর পারমিশন আপডেট করার ফাংশন
  const handleUpdatePermissions = async (adminId: string, newPermissions: string[]) => {
    const { error } = await supabase
      .from('profiles')
      .update({ permissions: newPermissions })
      .eq('id', adminId);

    if (error) {
      alert('পারমিশন আপডেট করা যায়নি: ' + error.message);
    } else {
      fetchAdmins();
      alert('পারমিশন সফলভাবে আপডেট হয়েছে!');
    }
  };

  if (loading) return <div className="p-6">লোড হচ্ছে...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">👑 সুপার অ্যাডমিন প্যানেল</h1>

      {/* নতুন Admin তৈরি ফর্ম */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="font-semibold text-lg mb-3">নতুন Admin তৈরি করুন</h2>
        <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="নতুন Admin-এর নাম *" value={name} onChange={(e) => setName(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="email" placeholder="ইমেইল *" value={email} onChange={(e) => setEmail(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="password" placeholder="পাসওয়ার্ড *" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="border rounded px-3 py-2" />

          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-700 mb-2">এই Admin কী কী কাজ করতে পারবে (অ্যাক্সেস):</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {ALL_PERMISSIONS.map(perm => (
                <label key={perm.key} className="flex items-center gap-2 bg-gray-50 p-2 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(perm.key)}
                    onChange={() => togglePermission(perm.key)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{perm.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="bg-red-500 text-white rounded py-2 hover:bg-red-600 md:col-span-2 disabled:opacity-50">
            {loading ? 'তৈরি হচ্ছে...' : 'Admin তৈরি করুন'}
          </button>
        </form>
        {message && <p className="mt-2 text-sm text-center font-semibold">{message}</p>}
      </div>

      {/* Admin তালিকা ও পারমিশন এডিট */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-lg mb-3">বর্তমান Admin তালিকা ({admins.length} জন)</h2>
        
        {admins.length === 0 ? (
          <p className="text-gray-500 text-center">এখনো কোনো Admin তৈরি করা হয়নি।</p>
        ) : (
          <div className="space-y-4">
            {admins.map(admin => (
              <AdminCard 
                key={admin.id} 
                admin={admin} 
                onDelete={handleDeleteAdmin} 
                onUpdatePermissions={handleUpdatePermissions}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Admin কার্ড কম্পোনেন্ট (আলাদা ফাংশন)
function AdminCard({ admin, onDelete, onUpdatePermissions }: { admin: any, onDelete: (id: string) => void, onUpdatePermissions: (id: string, perms: string[]) => void }) {
  const [editing, setEditing] = useState(false);
  const [draftPermissions, setDraftPermissions] = useState<string[]>(admin.permissions || []);

  const toggleDraft = (key: string) => {
    setDraftPermissions(prev => 
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    );
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">{admin.full_name} <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Admin</span></p>
          <p className="text-sm text-gray-600">📧 {admin.email}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setEditing(!editing); setDraftPermissions(admin.permissions || []); }}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            {editing ? 'বাতিল করুন' : 'অ্যাক্সেস এডিট'}
          </button>
          <button 
            onClick={() => onDelete(admin.id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            ডিলিট
          </button>
        </div>
      </div>

      {editing && (
        <div className="mt-3 border-t pt-3">
          <p className="text-sm font-medium mb-2">এই Admin-এর জন্য মডিউল নির্বাচন করুন:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {ALL_PERMISSIONS.map(perm => (
              <label key={perm.key} className="flex items-center gap-2 bg-white p-2 rounded cursor-pointer border">
                <input
                  type="checkbox"
                  checked={draftPermissions.includes(perm.key)}
                  onChange={() => toggleDraft(perm.key)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{perm.label}</span>
              </label>
            ))}
          </div>
          <button 
            onClick={() => onUpdatePermissions(admin.id, draftPermissions)}
            className="mt-3 bg-green-500 text-white px-4 py-2 rounded text-sm"
          >
            সংরক্ষণ করুন
          </button>
        </div>
      )}
    </div>
  );
}
