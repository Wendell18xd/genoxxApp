import { create } from 'zustand';
import { Alertas } from '../../../../../../../domain/entities/Alertas';

interface AlertState {
    alerta?: Alertas;
    setAlerta:(alerta:Alertas) => void;
    reset: () => void;
}

export const useAlertasStore = create<AlertState>()(set => ({
    alerta: undefined,
    setAlerta: (alerta: Alertas) => set({alerta}),
    reset: () => set({alerta: undefined}),
}));
