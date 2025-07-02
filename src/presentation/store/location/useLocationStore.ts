import {create} from 'zustand';
import {Location} from '../../../infrastructure/interfaces/location';
import {
  clearWatchLocation,
  getCurrentLocation,
  watchCurrentLocation,
} from '../../../actions/location/location';
import {validarGpsActivo} from '../../helper/checkGPS';

interface LocationState {
  lastKnownLocation: Location | null;
  userLocationList: Location[];
  watchId: number | null;

  getLocation: (validaGps?: boolean) => Promise<Location | null>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnownLocation: null,
  userLocationList: [],
  watchId: null,

  getLocation: async (validaGps = true) => {
    if (validaGps) {
      const gpsActivo = await validarGpsActivo();
      if (!gpsActivo) {
        return null;
      }
    }

    const location = await getCurrentLocation();
    console.log(location.latitude, location.longitude);
    set({lastKnownLocation: location});
    return location;
  },
  watchLocation: () => {
    const wachtId = get().watchId;
    if (wachtId !== null) {
      get().clearWatchLocation();
    }

    const id = watchCurrentLocation(location => {
      set({
        lastKnownLocation: location,
        userLocationList: [...get().userLocationList, location],
      });
    });
    set({watchId: id});
  },
  clearWatchLocation: () => {
    const wachtId = get().watchId;
    if (wachtId !== null) {
      clearWatchLocation(wachtId);
    }
  },
}));
