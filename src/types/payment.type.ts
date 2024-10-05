export interface IPaymentIntent {
  amount: number;
}

export interface IPayment {
  _id?: string;
  user?: string;
  post: string;
  amount: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
