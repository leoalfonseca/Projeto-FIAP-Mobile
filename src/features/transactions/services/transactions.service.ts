import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';

import { db } from '@/infra/firebase/firebase';

const coll = (uid: string) => collection(db, 'users', uid, 'transactions');

export type TxFilters = {
  category?: string;
  type?: 'Entrada' | 'Saída';
  paymentMethod?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
};

const stripUndefined = <T extends Record<string, any>>(obj: T): T => {
  const o: any = {};
  Object.keys(obj).forEach((k) => {
    const v = (obj as any)[k];
    if (v !== undefined) o[k] = v;
  });
  return o;
};

export async function listTransactionsPage(
  uid: string,
  pageSize: number,
  lastDocSnap?: any,
  filters?: TxFilters
) {
  const clauses: import('firebase/firestore').QueryConstraint[] = [orderBy('date', 'desc')];

  if (filters?.type) clauses.push(where('type', '==', filters.type));
  if (filters?.category) clauses.push(where('category', '==', filters.category));
  if (filters?.paymentMethod) clauses.push(where('paymentMethod', '==', filters.paymentMethod));
  if (filters?.startDate) clauses.push(where('date', '>=', Timestamp.fromDate(filters.startDate)));
  if (filters?.endDate) {
    const end = new Date(filters.endDate);
    end.setHours(23, 59, 59, 999);
    clauses.push(where('date', '<=', Timestamp.fromDate(end)));
  }

  let q = query(coll(uid), ...clauses, limit(pageSize));
  if (lastDocSnap) q = query(coll(uid), ...clauses, startAfter(lastDocSnap), limit(pageSize));

  const snap = await getDocs(q);

  const items = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      date: data.date?.toDate?.() ?? new Date(),
      createdAt: data.createdAt?.toDate?.(),
      updatedAt: data.updatedAt?.toDate?.()
    };
  });

  return {
    items,
    lastDocSnap: snap.docs.length ? snap.docs[snap.docs.length - 1] : undefined,
    hasMore: snap.docs.length === pageSize
  };
}

export async function createTransaction(uid: string, input: any) {
  const parsedDate = new Date(String(input.date ?? ''));
  if (isNaN(parsedDate.getTime())) throw new Error('Data inválida.');
  const parsedAmount = Number(input.amount);
  if (!isFinite(parsedAmount)) throw new Error('Valor inválido.');

  const payloadRaw = {
    ...input,
    // só inclua se existir
    ...(input.receiptUrl ? { receiptUrl: input.receiptUrl } : {}),
    date: Timestamp.fromDate(parsedDate),
    amount: parsedAmount,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const payload = stripUndefined(payloadRaw);

  console.log('[tx] addDoc start');
  const ref = await addDoc(coll(uid), payload);
  console.log('[tx] addDoc ok id=', ref.id);
  return { id: ref.id };
}

export async function updateTransaction(uid: string, id: string, input: any) {
  const toUpdateRaw = {
    ...input,
    ...(input.date ? { date: Timestamp.fromDate(new Date(String(input.date))) } : {}),
    ...(typeof input.amount === 'number' ? { amount: input.amount } : {}),
    ...(input.receiptUrl ? { receiptUrl: input.receiptUrl } : {}),
    updatedAt: serverTimestamp()
  };

  const toUpdate = stripUndefined(toUpdateRaw);

  await updateDoc(doc(coll(uid), id), toUpdate);
}
