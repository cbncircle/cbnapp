'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function DonorApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    const { data } = await supabase.from('donor_applications').select('*').order('created_at', { ascending: false });
    setApplications(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase.from('donor_applications').update({ status }).eq('id', id);

    if (error) {
      alert('স্ট্যাটাস আপডেট করা যায়নি: ' + error.message);
    } else {
      if (status === 'approved') {
        // অনুমোদন পেলে দাতার তালিকায় যোগ করুন
        const app = applications.find(a => a.id === id);
        if (app) {
          await supabase.from('donors').insert([
            { name: app.name, mobile: app.mobile, blood_group: app.blood_group, district: app.district, address: app.address, is_active: true, last_donation_date: null }
          ]);
        }
      }
      fetchApplications();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="p-6">লোড হচ্ছে...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">🩸 রক্তদাতার আবেদনসমূহ</h1>

      <div className="bg-white rounded-lg shadow p-4">
        {applications.length === 0 ? (
          <p className="text-gray-500 text-center">কোনো আবেদন নেই।</p>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <div key={app.id} className="border p-3 rounded bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{app.name} <span className="text-red-500">({app.blood_group})</span></p>
                    <p className="text-sm text-gray-600">📞 {app.mobile} | 📍 {app.district || 'N/A'}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(app.status)}`}>
                    {app.status === 'pending' ? 'পেন্ডিং' : app.status === 'approved' ? 'অনুমোদিত' : 'বাতিল'}
                  </span>
                </div>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => updateStatus(app.id, 'approved')} disabled={app.status === 'approved'} className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-green-600 disabled:opacity-50">
                    ✅ অনুমোদন করুন
                  </button>
                  <button onClick={() => updateStatus(app.id, 'rejected')} disabled={app.status === 'rejected'} className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 disabled:opacity-50">
                    ❌ বাতিল
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
