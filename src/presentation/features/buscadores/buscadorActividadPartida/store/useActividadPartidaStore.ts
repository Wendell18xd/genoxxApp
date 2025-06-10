import {create} from 'zustand';
import {ActividadPartida} from '../../../../../domain/entities/ActividadPartida';

export interface initialValuesActividadPartida {
  vl_part_negocio?: string;
  vl_regi_codigo?: string;
  vl_tipo?: string;
  vl_zona?: string;
  vl_part_tipo?: string;
  vl_part_clase?: string;
}

interface useActividadPartidaState {
  initialValues?: initialValuesActividadPartida;
  setInitialValues: (value: initialValuesActividadPartida) => void;
  setOnSelect: (fn: (actividad: ActividadPartida) => void) => void;
  onSelect: ((actividad: ActividadPartida) => void) | null;
  reset: () => void;
}

export const useActividadPartidaStore = create<useActividadPartidaState>()(
  set => ({
    initialValues: undefined,
    onSelect: null,
    setInitialValues: value => set({initialValues: value}),
    setOnSelect: fn => set({onSelect: fn}),
    reset: () => set({onSelect: null, initialValues: undefined}),
  }),
);
