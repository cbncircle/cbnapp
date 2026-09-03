'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function DonorsPage() {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonor, setSelectedDonor] = useState<any | null>(null);

  // ফর্মের স্টেট
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [message, setMessage] = useState('');

  // ফিল্টার ও সার্চ স্টেট
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('');

  // দাতাদের তালিকা লোড করার ফাংশন
  const fetchDonors = async () => {
    const { data } = await supabase
      .from('donors')
      .select('*')
      .order('created_at', { ascending: false });
    setDonors(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // ফিল্টার করা দাতাদের তালিকা
  const filteredDonors = donors.filter((donor) => {
    const matchesName = donor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup = filterBloodGroup ? donor.blood_group === filterBloodGroup : true;
    return matchesName && matchesBloodGroup;
  });

  // নতুন দাতা যোগ করার ফাংশন
  const handleAddDonor = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { error } = await supabase
      .from('donors')
      .insert([{ 
        name, 
        mobile, 
        blood_group: bloodGroup, 
        district, 
        last_donation_date: lastDonationDate, // এখন বাধ্যতামূলক
        is_active: true 
      }]);

    if (error) {
      setMessage('❌ কিছু ভুল হয়েছে: ' + error.message);
    } else {
      setMessage('✅ নতুন দাতা সফলভাবে যোগ হয়েছে!');
      setName(''); setMobile(''); setBloodGroup(''); setDistrict(''); setLastDonationDate('');
      fetchDonors();
    }
  };

  // ৯০ দিনের হিসাব করার ফাংশন
  const calculateNextEligibility = (lastDonationDate: string | null) => {
    const today = new Date();

    if (!lastDonationDate) {
      return { date: new Date(), daysLeft: 0 };
    }

    const last = new Date(lastDonationDate);
    const next = new Date(last);
    next.setDate(next.getDate() + 90);

    const diffTime = next.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return { date: next, daysLeft: diffDays };
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('bn-BD');
  };

  if (loading) return <div className="p-6">লোড হচ্ছে...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">🩸 দাতা ম্যানেজমেন্ট</h1>

      {/* নতুন দাতা যোগ করার ফর্ম */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="font-semibold text-lg mb-3">নতুন দাতা যোগ করুন</h2>
        <form onSubmit={handleAddDonor} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="দাতার নাম *" value={name} onChange={(e) => setName(e.target.value)} required className="border rounded px-3 py-2" />
          <input type="tel" placeholder="মোবাইল নম্বর *" value={mobile} onChange={(e) => setMobile(e.target.value)} required pattern="01[3-9][0-9]{8}" className="border rounded px-3 py-2" />
          
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required className="border rounded px-3 py-2">
            <option value="">রক্তের গ্রুপ নির্বাচন</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <input type="text" placeholder="জেলা / এলাকা" value={district} onChange={(e) => setDistrict(e.target.value)} className="border rounded px-3 py-2" />

          {/* সর্বশেষ রক্ত দিয়েছে (বাধ্যতামূলক) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📅 সর্বশেষ রক্ত দিয়েছে *
            </label>
            <input 
              type="date" 
              value={lastDonationDate} 
              onChange={(e) => setLastDonationDate(e.target.value)} 
              required // বাধ্যতামূলক
              className="w-full border rounded px-3 py-2"
              title="সর্বশেষ রক্তদানের তারিখ"
            />
          </div>
          
          <button type="submit" className="bg-red-500 text-white rounded py-2 hover:bg-red-600 md:col-span-2">দাতা যোগ করুন</button>
        </form>
        {message && <p className="mt-2 text-sm text-center font-semibold">{message}</p>}
      </div>

      {/* ফিল্টার ও সার্চ সেকশন */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="🔍 দাতার নাম দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <select
            value={filterBloodGroup}
            onChange={(e) => setFilterBloodGroup(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">সব রক্তের গ্রুপ</option>
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {/* দাতাদের তালিকা */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-lg mb-3">
          দাতাদের তালিকা ({filteredDonors.length} জন)
          {filterBloodGroup && <span className="text-sm text-red-500 ml-2">({filterBloodGroup} গ্রুপ)</span>}
        </h2>
        
        <div className="space-y-2">
          {filteredDonors.length === 0 ? (
            <p className="text-gray-500 text-center">কোনো দাতা পাওয়া যায়নি।</p>
          ) : (
            filteredDonors.map((donor) => (
              <div key={donor.id} className="border p-3 rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    <button 
                      onClick={() => setSelectedDonor(donor)}
                      className="text-red-500 hover:text-red-700 underline decoration-dotted underline-offset-2"
                    >
                      {donor.name}
                    </button>{' '}
                    <span className="text-red-500">({donor.blood_group})</span>
                  </p>
                  <p className="text-sm text-gray-600">📞 {donor.mobile} | 📍 {donor.district || 'N/A'}</p>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">সক্রিয়</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ডোনার ডিটেইলস মডাল */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-red-600">{selectedDonor.name}</h3>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">{selectedDonor.blood_group}</span>
              </div>
              <button onClick={() => setSelectedDonor(null)} className="text-gray-500 text-2xl">&times;</button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 font-semibold">ঠিকানা / এলাকা</p>
                <p className="text-gray-800">{selectedDonor.address || selectedDonor.district || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">মোবাইল</p>
                <p className="text-gray-800">{selectedDonor.mobile}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">মোট রক্তদান</p>
                <p className="text-gray-800">{selectedDonor.total_donations || 0} বার</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">সর্বশেষ রক্তদান</p>
                <p className="text-gray-800">{formatDate(selectedDonor.last_donation_date)}</p>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm text-gray-500 font-semibold">পরবর্তী রক্তদান</p>
                {(() => {
                  const { date, daysLeft } = calculateNextEligibility(selectedDonor.last_donation_date);
                  return (
                    <p className="text-gray-800">
                      {daysLeft <= 0 ? (
                        <span className="text-green-600 font-bold">এখনই রক্ত দিতে পারবেন</span>
                      ) : (
                        <>
                          {date.toLocaleDateString('bn-BD')} তারিখে
                          <span className="font-bold text-red-600"> ({daysLeft} দিন বাকি)</span>
                        </>
                      )}
                    </p>
                  );
                })()}
              </div>
            </div>

            <button
              onClick={() => setSelectedDonor(null)}
              className="w-full mt-6 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
