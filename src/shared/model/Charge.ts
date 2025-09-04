import { OrderChargeMethod } from '../enum/OrderChargeMethod';
import { PaymentStatus } from '../enum/PaymentStatus';

export interface Charge {
  id: string;
  projectId: string;
  orderId: string;
  paymentStatus: PaymentStatus;
  corePaymentId?: string;
  method: OrderChargeMethod;
  amountPaid?: number;
  amountDiscount?: number;
  originValue?: number;
  paidAt?: Date;
  canceledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
