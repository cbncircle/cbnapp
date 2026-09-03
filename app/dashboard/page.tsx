'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_donors: 0,
    pending_requests: 0,
    completed_donations: 0,
    new_public_requests: 0,
  });
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        setRole(profile?.role || null);

        const [donorsRes, requestsRes, donationsRes, publicRes] = await Promise.all([
          supabase.from('donors').select('*', { count: 'exact', head: true }),
          supabase.from('blood_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('donations').select('*', { count: 'exact', head: true }),
          supabase.from('public_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        ]);

        setStats({
          total_donors: donorsRes.count || 0,
          pending_requests: requestsRes.count || 0,
          completed_donations: donationsRes.count || 0,
          new_public_requests: publicRes.count || 0,
        });

        setLoading(false);
      }
    });
  }, [router]);

  // Realtime নোটিফিকেশন (নতুন পাবলিক রিকোয়েস্ট এলে সাথে সাথে সংখ্যা বাড়বে)
  useEffect(() => {
    const channel = supabase
      .channel('public-requests-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'public_requests' }, () => {
        setStats((prev) => ({ ...prev, new_public_requests: prev.new_public_requests + 1 }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-red-600">📊 ড্যাশবোর্ড</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            লগআউট
          </button>
        </div>

        <p className="text-gray-700">
          স্বাগতম, <span className="font-semibold">{user?.email}</span>!
          <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">
            {role === 'super_admin' ? '👑 Super Admin' : '🧑‍💼 Admin'}
          </span>
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-600">মোট দাতা</h3>
            <p className="text-2xl font-bold mt-2">{stats.total_donors}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600">চলমান অনুরোধ</h3>
            <p className="text-2xl font-bold mt-2">{stats.pending_requests}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600">সম্পন্ন</h3>
            <p className="text-2xl font-bold mt-2">{stats.completed_donations}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-600">🆕 নতুন পাবলিক রিকোয়েস্ট</h3>
            <p className="text-2xl font-bold mt-2">{stats.new_public_requests}</p>
          </div>
        </div>

        {/* Super Admin হলে Super Admin প্যানেলের লিংক */}
        {role === 'super_admin' && (
          <div className="mt-8">
            <a href="/super-admin/admins" className="block bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 font-bold">
              👑 Super Admin প্যানেল (Admin ম্যানেজমেন্ট)
            </a>
          </div>
        )}

        {/* সাধারণ নেভিগেশন */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          <a href="/dashboard/donors" className="bg-red-500 text-white p-4 rounded-lg text-center hover:bg-red-600">
            🩸 দাতা ম্যানেজমেন্ট
          </a>
          <a href="/dashboard/requests" className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600">
            📋 রক্তের অনুরোধ
          </a>
          <a href="/dashboard/donations" className="bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600">
            📝 রক্তদান রেকর্ড
          </a>
          <a href="/dashboard/leaderboard" className="bg-yellow-500 text-white p-4 rounded-lg text-center hover:bg-yellow-600">
            🏆 লিডারবোর্ড
          </a>
          {/* নতুন: রক্তদাতার আবেদন বাটন */}
          <a href="/dashboard/donor-applications" className="bg-purple-500 text-white p-4 rounded-lg text-center hover:bg-purple-600">
            🩸 রক্তদাতার আবেদন
          </a>
        </div>
      </div>
    </div>
  );
}
