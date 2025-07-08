import {create} from 'zustand';
import {ConsultaEjecucion} from '../../../../domain/entities/ConsultaEjecucion';

interface ConsultaDetalleState {
  consulta?: ConsultaEjecucion;
  isRefresthConsulta: boolean;
  setConsulta: (consulta: ConsultaEjecucion) => void;
  setIsRefresthConsulta: (isRefresthConsulta: boolean) => void;
  reset: () => void;
}

export const useConsultaEjecucionStore = create<ConsultaDetalleState>()(
  set => ({
    consulta: undefined,
    isRefresthConsulta: false,
    setConsulta: (consulta: ConsultaEjecucion) => set({consulta}),
    setIsRefresthConsulta: (isRefresthConsulta: boolean) =>
      set({isRefresthConsulta}),
    reset: () => set({consulta: undefined}),
  }),
);
