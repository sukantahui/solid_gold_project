export interface CustomerInterface {
  customerName: string;
  customerCategoryId: number;
  mailingName: string;
  email?: string;
  phone?: string;
  mobile1?: string;
  mobile2?: string;
  whatsapp?: string;
  address?: string;
  pinCode?: string;
  openingGoldBalance?: number;
  openingCashBalance?: number;


  customerId?: number;
  category?: {
    customerCategoryId: number;
    customerCategoryName: string;
  };
  contact?: {
    email: string;
    phone: string;
    mobile1: string | null;
    mobile2: string | null;
    whatsapp: string | null;
    address: string;
    pinCode: string;
  };
  balances?: {
    gold: number;
    cash: number;
  };
  status?: {
    active: boolean;
    orderActive: boolean;
    billActive: boolean;
    jobActive: boolean;
    inforce: boolean;
  };
  timestamps?: {
    createdAt: string | null;
    updatedAt: string | null;
  };
}