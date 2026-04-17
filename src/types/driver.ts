export type DriverProfile = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  status: string;
};

export type DriverQr = {
  token: string;
};

export type DriverCashbackSummary = {
  totalCashbackAmount: number;
  totalLiters: number;
  entryCount: number;
  byBrand?: Array<{
    brandId?: string;
    brandName?: string;
    brandCode?: string;
    totalCashbackAmount?: number;
    totalLiters?: number;
    entryCount?: number;
  }>;
};

export type DriverStationBrand = {
  id: string;
  name: string;
  code: string;
};

export type DriverStation = {
  id: string;
  name: string;
  stationCode: string;
  brand?: DriverStationBrand;
};

export type DriverRecentTransaction = {
  id: string;
  reference: string;
  liters: number;
  amount: number;
  fuelType: string;
  cashbackAmount: number;
  status: string;
  confirmedAt?: string;
  station?: DriverStation;
};

export type DriverDashboardData = {
  driver: DriverProfile;
  qr: DriverQr;
  cashback: DriverCashbackSummary;
  recentTransactions: DriverRecentTransaction[];
};

export type DriverDashboardResponse = {
  success: boolean;
  data: DriverDashboardData;
};

export type DriverOrganization = {
  id: string;
  name: string;
};

export type DriverAffiliationData = {
  organization?: DriverOrganization;
  status?: string;
};

export type DriverAffiliationResponse = {
  success: boolean;
  data: DriverAffiliationData | null;
};

export type DriverReferralItem = {
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  status?: string;
  createdAt?: string;
};

export type DriverReferralSummaryData = {
  invitationCount: number;
  referredDrivers: DriverReferralItem[];
};

export type DriverReferralSummaryResponse = {
  success: boolean;
  data: DriverReferralSummaryData;
};
