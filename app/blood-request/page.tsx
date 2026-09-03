'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function BloodRequestPage() {
  const [formData, setFormData] = useState({
    patient_name: '',
    blood_group: '',
    hospital: '',
    units: 1, // ডাটাবেসে units, কিন্তু UI তে "ব্যাগ"
    contact_name: '',
    contact_mobile: '',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'units' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    // স্প্যাম প্রতিরোধ (সহজ ক্যাপচা)
    const answer = prompt('স্প্যাম প্রতিরোধ: 3 + 4 = ?');
    if (answer !== '7') {
      setMessage('ভুল উত্তর! আবার চেষ্টা করুন।');
      setSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from('public_requests')
      .insert([formData]);

    if (error) {
      setMessage('দুঃখিত, কিছু ভুল হয়েছে। আবার চেষ্টা করুন।');
    } else {
      // সফল সাবমিশনের পর টেলিগ্রামে নোটিফিকেশন পাঠান
      await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `<b>🩸 নতুন রক্তের অনুরোধ!</b>\n\n<b>রোগীর নাম:</b> ${formData.patient_name}\n<b>রক্তের গ্রুপ:</b> ${formData.blood_group}\n<b>প্রয়োজন:</b> ${formData.units} ব্যাগ\n<b>হাসপাতাল:</b> ${formData.hospital}\n<b>যোগাযোগ:</b> ${formData.contact_name} (<a href="tel:+88${formData.contact_mobile}">${formData.contact_mobile}</a>)`
        })
      });

      setMessage('✅ আপনার রক্তের অনুরোধ সফলভাবে জমা হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।');
      setFormData({
        patient_name: '',
        blood_group: '',
        hospital: '',
        units: 1,
        contact_name: '',
        contact_mobile: '',
        reason: ''
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">🩸 রক্তের অনুরোধ করুন</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">রোগীর নাম *</label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="রোগীর পূর্ণ নাম"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">রক্তের গ্রুপ *</label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option value="">নির্বাচন করুন</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">হাসপাতাল *</label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="হাসপাতালের নাম"
            />
          </div>

          {/* নতুন: ব্যাগ সংখ্যা */}
          <div>
            <label className="block text-sm font-medium text-gray-700">কত ব্যাগ রক্ত প্রয়োজন? *</label>
            <select
              name="units"
              value={formData.units}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option value={1}>১ ব্যাগ</option>
              <option value={2}>২ ব্যাগ</option>
              <option value={3}>৩ ব্যাগ</option>
              <option value={4}>৪ ব্যাগ</option>
              <option value={5}>৫ ব্যাগ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">যোগাযোগকারীর নাম *</label>
            <input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="আপনার নাম"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">মোবাইল নম্বর *</label>
            <input
              type="tel"
              name="contact_mobile"
              value={formData.contact_mobile}
              onChange={handleChange}
              required
              pattern="01[3-9][0-9]{8}"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">কারণ (ঐচ্ছিক)</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              rows={3}
              placeholder="রক্তের প্রয়োজন সম্পর্কে সংক্ষিপ্ত বিবরণ"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50"
          >
            {submitting ? 'জমা হচ্ছে...' : 'অনুরোধ পাঠান'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
