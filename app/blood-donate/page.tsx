'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function BloodDonatePage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    blood_group: '',
    district: '',
    address: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const { error } = await supabase
      .from('donor_applications')
      .insert([formData]);

    if (error) {
      setMessage('দুঃখিত, কিছু ভুল হয়েছে। আবার চেষ্টা করুন।');
    } else {
      setMessage('✅ আপনার রক্তদানের আবেদন সফলভাবে জমা হয়েছে! আমাদের টিম শীঘ্রই যোগাযোগ করবে।');
      setFormData({ name: '', mobile: '', blood_group: '', district: '', address: '' });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">🩸 রক্ত দিতে চাই</h1>
        <p className="text-gray-600 text-center mb-6">আপনি যদি স্বেচ্ছায় রক্ত দিতে চান, তবে নিচের ফর্মটি পূরণ করুন।</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">আপনার নাম *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="পূর্ণ নাম" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">মোবাইল নম্বর *</label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required pattern="01[3-9][0-9]{8}" className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="01XXXXXXXXX" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">রক্তের গ্রুপ *</label>
            <select name="blood_group" value={formData.blood_group} onChange={handleChange} required className="mt-1 w-full border rounded-lg px-3 py-2">
              <option value="">নির্বাচন করুন</option>
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">জেলা / এলাকা</label>
            <input type="text" name="district" value={formData.district} onChange={handleChange} className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="যেমন: চৌরঙ্গী, খুলনা" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ঠিকানা (ঐচ্ছিক)</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="বিস্তারিত ঠিকানা" />
          </div>

          <button type="submit" disabled={submitting} className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50">
            {submitting ? 'জমা হচ্ছে...' : 'আবেদন পাঠান'}
          </button>
        </form>

        {message && <p className={`mt-4 text-center text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
      </div>
    </div>
  );
}
