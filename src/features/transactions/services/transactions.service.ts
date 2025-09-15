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
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '@/infra/firebase/firebase';

const coll = (uid: string) => collection(db, 'users', uid, 'transactions');

export type TxFilters = {
  category?: string;
  type?: 'Entrada' | 'Saída';
  paymentMethod?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
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
  const payload = {
    ...input,
    date: Timestamp.fromDate(new Date(input.date as string)),
    amount: Number(input.amount),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  const d = await addDoc(coll(uid), payload);
  const snap = await getDoc(d);
  return { id: d.id, ...snap.data() };
}

export async function updateTransaction(uid: string, id: string, input: any) {
  await updateDoc(doc(coll(uid), id), {
    ...input,
    ...(input.date ? { date: Timestamp.fromDate(new Date(input.date as string)) } : {}),
    ...(typeof input.amount === 'number' ? { amount: input.amount } : {}),
    updatedAt: serverTimestamp()
  });
}

export async function uploadReceipt(uid: string, localUri: string) {
  const resp = await fetch(localUri);
  const blob = await resp.blob();

  const key = `receipts/${uid}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
  const storageRef = ref(storage, key);

  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
}
