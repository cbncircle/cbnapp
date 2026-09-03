export type Role = 'admin' | 'super_admin';

export type Permission = 
  | 'donors' 
  | 'requests' 
  | 'donations' 
  | 'messages' 
  | 'leaderboard';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  permissions: Permission[] | null;
}

export interface Donor {
  id: number;
  name: string;
  mobile: string;
  address?: string;
  district?: string;
  blood_group: string;
  last_donation_date?: string;
  total_donations: number;
  is_active: boolean;
  notes?: string;
}

export interface BloodRequest {
  id: number;
  patient_name: string;
  blood_group: string;
  hospital: string;
  units: number;
  urgency: 'normal' | 'urgent';
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export interface PublicRequest {
  id: number;
  patient_name: string;
  blood_group: string;
  hospital: string;
  contact_name: string;
  contact_mobile: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Donation {
  id: number;
  donor_id: number;
  donation_date: string;
  recipient_name?: string;
  hospital?: string;
  notes?: string;
}
