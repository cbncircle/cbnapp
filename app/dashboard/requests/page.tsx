'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('pending');
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [hospital, setHospital] = useState('');
  const [units, setUnits] = useState(1); // "ব্যাগ"
  const [formMessage, setFormMessage] = useState('');

  const fetchRequests = async () => {
    let query = supabase.from('public_requests').select('*');
    if (sortBy === 'all') {
      query = query.order('created_at', { ascending: false });
    } else {
      query = query.eq('status', sortBy).order('created_at', { ascending: false });
    }
    const { data } = await query;
    setRequests(data || []);
  };

  useEffect(() => {
    fetchRequests();
  }, [sortBy]);

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase.from('public_requests').update({ status }).eq('id', id);
    if (error) alert('স্ট্যাটাস আপডেট করা যায়নি: ' + error.message);
    else fetchRequests();
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage('');
    const { error } = await supabase.from('public_requests').insert([
      { patient_name: patientName, blood_group: bloodGroup, hospital, units, contact_name: 'Admin', contact_mobile: '01700000000', reason: '', status: 'pending' }
    ]);
    if (error) {
      setFormMessage('❌ সমস্যা: ' + error.message);
    } else {
      setFormMessage('✅ নতুন রিকোয়েস্ট তৈরি হয়েছে!');
      setPatientName(''); setBloodGroup(''); setHospital(''); setUnits(1);
      fetchRequests();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'পেন্ডিং';
      case 'processing': return 'ম্যাচিং';
      case 'completed': return 'ডোনেট সম্পন্ন';
      case 'rejected': return 'বাতিল';
      default: return status;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">📋 রক্তের অনুরোধ + ম্যাচিং</h1>

      <div className="mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-3 py-2 text-sm font-medium bg-white"
        >
          <option value="pending">🕒 পেন্ডিং</option>
          <option value="processing">🔍 ম্যাচিং</option>
          <option value="completed">✅ ডোনেট সম্পন্ন</option>
          <option value="rejected">❌ বাতিল</option>
          <option value="all">📋 সব</option>
        </select>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg shadow mb-6">
        <h2 className="font-semibold text-lg mb-3">রিকোয়েস্ট লিস্ট ({requests.length} টি)</h2>
        {requests.length === 0 ? (
          <p className="text-gray-500">এই স্ট্যাটাসে কোনো রিকোয়েস্ট নেই।</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-white p-4 rounded-lg border hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{req.patient_name} <span className="text-red-500">({req.blood_group})</span></p>
                    <p className="text-sm text-gray-600">🏥 {req.hospital} | 📞 {req.contact_mobile}</p>
                    <p className="text-xs text-gray-400 mt-1">📅 {new Date(req.created_at).toLocaleDateString('bn-BD')} | 📦 {req.units || 1} ব্যাগ</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(req.status)}`}>{getStatusLabel(req.status)}</span>
                </div>

                <div className="flex gap-2 mt-3">
                  <Link href={`/dashboard/requests/${req.id}`} className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-600">
                    🔍 ম্যাচিং শুরু
                  </Link>
                  <button
                    onClick={() => updateStatus(req.id, 'completed')}
                    disabled={req.status === 'completed'}
                    className="bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-600 disabled:opacity-50"
                  >
                    ✅ ডোনেট সম্পন্ন
                  </button>
                  <button
                    onClick={() => updateStatus(req.id, 'rejected')}
                    disabled={req.status === 'rejected'}
                    className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-600 disabled:opacity-50"
                  >
                    ❌ বাতিল
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="font-semibold text-lg mb-3">নতুন রক্তের অনুরোধ করুন (ম্যানুয়ালি)</h2>
        <form onSubmit={handleManualSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="রোগীর নাম *" value={patientName} onChange={(e) => setPatientName(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="text" placeholder="হাসপাতালের নাম *" value={hospital} onChange={(e) => setHospital(e.target.value)} required className="border rounded px-3 py-2" />
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required className="border rounded px-3 py-2">
            <option value="">রক্তের গ্রুপ নির্বাচন</option>
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select value={units} onChange={(e) => setUnits(Number(e.target.value))} className="border rounded px-3 py-2">
            <option value={1}>১ ব্যাগ</option>
            <option value={2}>২ ব্যাগ</option>
            <option value={3}>৩ ব্যাগ</option>
            <option value={4}>৪ ব্যাগ</option>
            <option value={5}>৫ ব্যাগ</option>
          </select>
          <button type="submit" className="bg-red-500 text-white rounded py-2 hover:bg-red-600 md:col-span-2">নতুন রিকোয়েস্ট তৈরি করুন</button>
        </form>
        {formMessage && <p className="mt-2 text-sm text-center font-semibold">{formMessage}</p>}
      </div>
    </div>
  );
}
