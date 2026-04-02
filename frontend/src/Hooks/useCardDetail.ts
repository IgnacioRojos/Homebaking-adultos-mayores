import { useEffect, useState, useCallback, type ReactNode } from "react";
import { api } from "../Utils/api";


type CardDetail = {
  cvv: ReactNode;
  number: string;
  type: "credit" | "debit";
  status: string;

  creditLimit?: number;
  availableLimit?: number;
  consumed?: number;

  balance?: number;

  closingDate: string;
  dueDate: string;

  movements: any[];
  lastPayment: any;

  totalPurchases: number;
  totalPayments: number;
  amountToPay: number;
};

export const useCardDetail = (_id: string | undefined) => { 
  const [detail, setDetail] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const fetchDetail = useCallback(async () => {
    if (!_id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await api(`/card/${_id}/details`);
      setDetail(data);
    } catch (err) {
      console.error("Error cargando detalle:", err);
      setError("No se pudo cargar la tarjeta");
    } finally {
      setLoading(false);
    }
  }, [_id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  // ===============================
  // DATOS DERIVADOS (CLAVE UX)
  // ===============================

  const hasDebt = (detail?.amountToPay ?? 0) > 0;

  const hasBalance =
    detail?.type === "debit"
      ? (detail?.balance ?? 0) > 0
      : (detail?.availableLimit ?? 0) > 0;

  const isCardActive = detail?.status === "active";

  return {
    detail,
    loading,
    error,
    refetch: fetchDetail,

    //derivados listos para UI
    hasDebt,
    hasBalance,
    isCardActive
  };
};





