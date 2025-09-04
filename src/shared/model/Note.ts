import { OrderAuthor } from './OrderAuthor';

import { NoteType } from '../enum/NoteType';
import { PaymentStatus } from '../enum/PaymentStatus';
import { PlatformStatus } from '../enum/PlatformStatus';
import { ShippingStatus } from '../enum/ShippingStatus';

export interface Note<MetaData = { [key: string]: string }> {
  id: string;
  orderId: string;
  noteReferenceId?: string;
  authorId?: string;
  author?: OrderAuthor;
  content?: string;
  type: NoteType;
  metaData?: MetaData;
  paymentStatus?: PaymentStatus;
  shippingStatus?: ShippingStatus;
  platformStatus?: PlatformStatus;
  createdAt: string;
  referencedNote?: Note;
  notesReferencingThisNote: Note[];
}
