export interface CustomerInterface {
  customerName: string;
  customerCategoryId: number;
  category?: {};
  mailingName: string;
  email?: string;
  phone?: string;
  mobile1?: string;
  mobile2?: string;
  whatsapp: string;
  address: string;
  pinCode?: string;
  openingGoldBalance?: number;
  openingCashBalance?: number;
}