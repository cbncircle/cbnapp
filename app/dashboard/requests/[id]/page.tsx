'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabaseClient';

export default function RequestMatchingPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.id;

  const [request, setRequest] = useState<any>(null);
  const [matchedDonors, setMatchedDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase
      .from('public_requests')
      .select('*')
      .eq('id', requestId)
      .single()
      .then(async ({ data }) => {
        if (data) {
          setRequest(data);
          const { data: donors, error } = await supabase
            .from('donors')
            .select('*')
            .eq('blood_group', data.blood_group)
            .eq('is_active', true)
            .or(`last_donation_date.is.null,last_donation_date.lte.${new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}`);

          if (error) {
            setMessage('❌ সমস্যা হয়েছে: ' + error.message);
          } else {
            setMatchedDonors(donors || []);
            if (donors?.length === 0) {
              setMessage('এই গ্রুপের কোনো সক্রিয় দাতা ৯০ দিন পেরিয়ে পাওয়া যায়নি।');
            }
          }
        }
        setLoading(false);
      });
  }, [requestId]);

  const sendWhatsApp = (donor: any) => {
    const msg = `আসসালামু আলাইকুম ${donor.name}, CBN Blood Network থেকে বলা হচ্ছে। ${request.hospital} এ ${request.blood_group} রক্তের জরুরি প্রয়োজন। আপনি কি রক্তদানে আগ্রহী?`;
    window.open(`https://wa.me/${donor.mobile}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const callDonor = (mobile: string) => {
    window.location.href = `tel:${mobile}`;
  };

  if (loading) {
    return <div className="p-6 text-center">লোড হচ্ছে...</div>;
  }

  if (!request) {
    return <div className="p-6 text-center">রিকোয়েস্ট পাওয়া যায়নি।</div>;
  }

  return (
    <div className="p-6">
      <button onClick={() => router.back()} className="mb-4 text-blue-500 underline">← ফিরে যান</button>
      <h1 className="text-2xl font-bold text-red-600 mb-4">📋 ম্যাচিং: {request.patient_name}</h1>

      <div className="bg-blue-50 p-4 rounded-lg shadow mb-6">
        <p className="font-bold">{request.patient_name} <span className="text-red-500">({request.blood_group})</span></p>
        <p className="text-sm text-gray-600">🏥 {request.hospital} | 📞 {request.contact_mobile}</p>
        <p className="text-xs text-gray-400 mt-1">📅 {new Date(request.created_at).toLocaleDateString('bn-BD')}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-lg mb-3">ম্যাচিং দাতা ({matchedDonors.length} জন)</h2>
        {matchedDonors.length === 0 ? (
          <p className="text-gray-500">{message || 'কোনো দাতা পাওয়া যায়নি।'}</p>
        ) : (
          <div className="space-y-2">
            {matchedDonors.map((donor, idx) => (
              <div key={donor.id} className="border p-3 rounded bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-bold">{idx + 1}. {donor.name} <span className="text-red-500">({donor.blood_group})</span></p>
                  <p className="text-sm text-gray-600">📞 {donor.mobile} | 📍 {donor.district || 'N/A'}</p>
                  <p className="text-xs text-gray-500">মোট দান: {donor.total_donations || 0} বার</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => callDonor(donor.mobile)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm font-semibold">📞 কল</button>
                  <button onClick={() => sendWhatsApp(donor)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm font-semibold">📱 WhatsApp</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
