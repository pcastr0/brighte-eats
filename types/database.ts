export interface Customer {
  customer_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Service {
  service_id: number;
  service_name: string;
  description: string;
  created_at?: Date;
}

export interface CustomerInterest {
  interest_id?: number;
  customer_id: number;
  service_id: number;
  created_at?: Date;
}
