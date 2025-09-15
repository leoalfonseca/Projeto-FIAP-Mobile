import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { auth } from '@/infra/firebase/firebase';

import { listTransactionsPage, TxFilters } from '../services/transactions.service';

const PAGE_SIZE = 10;

export function useTransactions(filters?: TxFilters) {
  const uid = auth.currentUser?.uid;
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastDocRef = useRef<any>(null);

  const _filters = useMemo(() => filters, [JSON.stringify(filters || {})]);

  const loadInitial = useCallback(async () => {
    if (!uid) return;
    setLoading(true);
    try {
      const { items, lastDocSnap, hasMore } = await listTransactionsPage(
        uid,
        PAGE_SIZE,
        undefined,
        filters
      );
      setItems(items);
      lastDocRef.current = lastDocSnap;
      setHasMore(hasMore);
    } finally {
      setLoading(false);
    }
  }, [uid, _filters]);

  const loadMore = useCallback(async () => {
    if (!uid || !hasMore || loading) return;
    setLoading(true);
    try {
      const {
        items: next,
        lastDocSnap,
        hasMore: more
      } = await listTransactionsPage(uid, PAGE_SIZE, lastDocRef.current, filters);
      setItems((prev) => [...prev, ...next]);
      lastDocRef.current = lastDocSnap;
      setHasMore(more);
    } finally {
      setLoading(false);
    }
  }, [uid, hasMore, loading, _filters]);

  const refresh = useCallback(async () => {
    if (!uid) return;
    setRefreshing(true);
    try {
      const { items, lastDocSnap, hasMore } = await listTransactionsPage(
        uid,
        PAGE_SIZE,
        undefined,
        filters
      );
      setItems(items);
      lastDocRef.current = lastDocSnap;
      setHasMore(hasMore);
    } finally {
      setRefreshing(false);
    }
  }, [uid, _filters]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return { items, loading, hasMore, loadMore, refresh, refreshing };
}
