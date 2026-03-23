import { useEffect, useState } from "react";
import { api } from "../Utils/api";

export const useCardDetail = (_id: string | undefined) => { // Acepta undefined
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(false); // Tip: agrega un estado de carga

  useEffect(() => {
    // Si _id no existe o es el string "undefined", no hagas nada
    if (!_id || _id === "undefined") return;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await api(`/card/${_id}/details`);
        if (Array.isArray(data) && data.length > 0) {
          setDetail(data[0]);
        } else {
          setDetail(data);
        }
      } catch (error) {
        console.error("Error cargando detalle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [_id]);

  return { detail, loading };
};



/*import { useEffect, useState } from "react";
import { api } from "../Utils/api";

export const useCardDetail = (_id: string) => {
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await api(`/card/${_id}/details`);
      setDetail(data);
    };

    fetchDetail();
  }, [_id]);

  return { detail };
};*/