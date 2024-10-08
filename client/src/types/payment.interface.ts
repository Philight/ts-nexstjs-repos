export enum PaymentType {
  VISA = 'VISA',
  PAY_PAL = 'PAY_PAL',
  MAGIC = 'MAGIC',
}

export interface Payment {
  createdAt: string;
  id: number;

  type: PaymentType;

  cardNumber: string;
  cardExpiresAt: Date;

  temp: boolean | null;
}

export type CreatePaymentData = Omit<Payment, 'id' | 'createdAt'> & {
  cardCvv: string;
};
