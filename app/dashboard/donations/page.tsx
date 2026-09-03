'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function DonationsPage() {
  const [donors, setDonors] = useState<any[]>([]);
  const [selectedDonorId, setSelectedDonorId] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [hospital, setHospital] = useState('');
  const [message, setMessage] = useState('');

  // দাতাদের তালিকা লোড (ড্রপডাউনের জন্য)
  useEffect(() => {
    supabase
      .from('donors')
      .select('id, name, blood_group')
      .eq('is_active', true)
      .then(({ data }) => setDonors(data || []));
  }, []);

  const handleAddDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    // ১. ডোনেশন রেকর্ড যোগ করুন
    const { error: donationError } = await supabase
      .from('donations')
      .insert([{
        donor_id: selectedDonorId,
        donation_date: donationDate,
        recipient_name: recipientName,
        hospital: hospital
      }]);

    if (donationError) {
      setMessage('❌ রেকর্ড যোগ করা যায়নি: ' + donationError.message);
      return;
    }

    // ২. দাতার total_donations + 1 করুন
    const { data: donorData } = await supabase
      .from('donors')
      .select('total_donations')
      .eq('id', selectedDonorId)
      .single();

    const newCount = (donorData?.total_donations || 0) + 1;

    // ৩. দাতার last_donation_date আপডেট করুন
    const { error: updateError } = await supabase
      .from('donors')
      .update({ 
        total_donations: newCount,
        last_donation_date: donationDate 
      })
      .eq('id', selectedDonorId);

    if (updateError) {
      setMessage('❌ দাতার তথ্য আপডেট করা যায়নি: ' + updateError.message);
      return;
    }

    setMessage('✅ রক্তদান সফলভাবে রেকর্ড হয়েছে!');
    setSelectedDonorId('');
    setDonationDate('');
    setRecipientName('');
    setHospital('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">📝 রক্তদান রেকর্ড</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="font-semibold text-lg mb-3">নতুন রক্তদান যোগ করুন</h2>
        <form onSubmit={handleAddDonation} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select value={selectedDonorId} onChange={(e) => setSelectedDonorId(e.target.value)} required className="border rounded px-3 py-2">
            <option value="">দাতা নির্বাচন করুন</option>
            {donors.map(donor => (
              <option key={donor.id} value={donor.id}>{donor.name} ({donor.blood_group})</option>
            ))}
          </select>

          <input type="date" value={donationDate} onChange={(e) => setDonationDate(e.target.value)} required className="border rounded px-3 py-2" />
          
          <input type="text" placeholder="রোগীর নাম (ঐচ্ছিক)" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="border rounded px-3 py-2" />
          
          <input type="text" placeholder="হাসপাতাল (ঐচ্ছিক)" value={hospital} onChange={(e) => setHospital(e.target.value)} className="border rounded px-3 py-2" />

          <button type="submit" className="bg-green-500 text-white rounded py-2 hover:bg-green-600 md:col-span-2">রেকর্ড সংরক্ষণ করুন</button>
        </form>
        {message && <p className="mt-2 text-sm font-semibold text-center">{message}</p>}
      </div>
    </div>
  );
}
