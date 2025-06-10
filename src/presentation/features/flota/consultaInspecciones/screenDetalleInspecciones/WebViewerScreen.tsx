import {RouteProp, useRoute} from '@react-navigation/native';
import {WebViewer} from '../../../../components/WebViewer';
import DrawerLayout from '../../../main/layout/DrawerLayout';

type Params = {
  WebViewer: {url: string; postData?: string};
};

export const WebViewerScreen = () => {
  const route = useRoute<RouteProp<Params, 'WebViewer'>>();
  const {url, postData} = route.params;

  return (
    <DrawerLayout>
      <WebViewer url={url} postData={postData} />
    </DrawerLayout>
  );
};
