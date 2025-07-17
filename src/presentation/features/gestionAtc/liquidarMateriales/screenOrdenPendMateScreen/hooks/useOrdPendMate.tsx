import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../../store/auth/useAuthStore";
import { getDocumentoOrdenes } from "../../../../../../actions/gestionATC/ordenesATC";

interface OrdenesPendientesMateFromValues {

}

export const useOrdPendMate = () => {
    const {user} = useAuthStore()
    

    const {
        data: ordenesPendientesMate,
        isFetching: isFetchingordenesPendientesMate,
        refetch: refetchordenesPendientesMate,
        error: errorordenesPendientesMate,
    } = useQuery({
        queryKey: ['ordenesPendientesMate'],
        queryFn: async () => {
            const resp = await getDocumentoOrdenes({vl_empr_codigo: use});
            return datos;
        },
        enabled: false,
    })

};
  return ()
