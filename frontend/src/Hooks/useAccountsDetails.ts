import { useEffect, useState, useCallback } from "react";
import { api } from "../Utils/api";

export const useAccountDetail = (id: string | undefined) => {
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchDetail = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const account = await api(`/accounts/${id}`);
      const movements = await api(`/accounts/${id}/movements`);

      setDetail({
        ...account,
        movements
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    detail,
    loading,
    refetch: fetchDetail
  };
};