import {genoxxApi} from '../../config/api/genoxxApi';
import {VersionAppResponse} from '../../infrastructure/interfaces/auth.response';

export const getVersionApp = async (): Promise<VersionAppResponse> => {
  try {
    const {data} = await genoxxApi.post<VersionAppResponse>(
      '/app/get_version_app',
    );

    return data;
  } catch (error) {
    throw new Error('Error fetching version app data: ' + error);
  }
};
