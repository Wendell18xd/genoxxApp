import {create} from 'zustand';
import {Obra} from '../../../../../domain/entities/Obra';
import {Option} from 'react-native-paper-dropdown';
import {
  MaterialesLiquiRequest,
  SaveLiquiMateObraRequest,
} from '../../../../../infrastructure/interfaces/gestionObras/liquidar-materiales/saveLiquiMateObra.request';

const initialSaveLiquiMateObra: SaveLiquiMateObraRequest = {
  vg_empr_codigo: '',
  vl_reg_codigo: '',
  vg_usua_perfil: '',
  vl_materiales: [],
};

interface LiquiMateState {
  obra?: Obra;
  guias?: Option[];
  guiaSeleccionada: string;
  saveLiquiMatObra: SaveLiquiMateObraRequest;
  materialesSeleccionados: MaterialesLiquiRequest[];
  setObra: (obra: Obra) => void;
  setGuias: (guias: Option[]) => void;
  setGuiaSeleccionada: (guia: string) => void;
  setSaveLiquiMatObra: (saveLiquiMatObra: SaveLiquiMateObraRequest) => void;
  setMaterialesSeleccionados: (
    materialesSeleccionados: MaterialesLiquiRequest[],
  ) => void;
  reset: () => void;
}

export const useLiquiMateStore = create<LiquiMateState>()(set => ({
  obra: undefined,
  guias: [],
  guiaSeleccionada: 'TODOS',
  saveLiquiMatObra: initialSaveLiquiMateObra,
  materialesSeleccionados: [],
  setObra: (obra: Obra) => set({obra}),
  setGuias: (guias: Option[]) => set({guias}),
  setGuiaSeleccionada: (guia: string) => set({guiaSeleccionada: guia}),
  setSaveLiquiMatObra: (saveLiquiMatObra: SaveLiquiMateObraRequest) =>
    set({saveLiquiMatObra}),
  setMaterialesSeleccionados: (
    materialesSeleccionados: MaterialesLiquiRequest[],
  ) => set({materialesSeleccionados}),
  reset: () =>
    set({
      obra: undefined,
      guias: [],
      guiaSeleccionada: 'TODOS',
      saveLiquiMatObra: initialSaveLiquiMateObra,
      materialesSeleccionados: [],
    }),
}));
