'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function LeaderboardPage() {
  const [topDonors, setTopDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('donors')
      .select('name, blood_group, total_donations, district')
      .order('total_donations', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        setTopDonors(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">লোড হচ্ছে...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-600 mb-4">🏆 রক্তদাতা লিডারবোর্ড</h1>

      <div className="bg-white rounded-lg shadow p-4">
        {topDonors.length === 0 ? (
          <p className="text-gray-500 text-center">এখনো কোনো দাতা রক্ত দান করেনি।</p>
        ) : (
          <div className="space-y-3">
            {topDonors.map((donor, idx) => (
              <div key={idx} className={`p-3 rounded flex items-center justify-between border ${idx === 0 ? 'bg-yellow-50 border-yellow-300' : idx === 1 ? 'bg-gray-50 border-gray-300' : idx === 2 ? 'bg-orange-50 border-orange-300' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                  </span>
                  <div>
                    <p className="font-bold">{donor.name} <span className="text-red-500 text-sm">({donor.blood_group})</span></p>
                    <p className="text-xs text-gray-500">📍 {donor.district || 'N/A'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{donor.total_donations}</p>
                  <p className="text-xs text-gray-500">বার রক্তদান</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
