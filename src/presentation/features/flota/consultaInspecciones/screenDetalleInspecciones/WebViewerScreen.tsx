import React, {useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {WebViewer} from '../../../../components/WebViewer';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';

type Params = {
  WebViewer: {url: string; postData?: string};
};

export const WebViewerScreen = () => {
  const route = useRoute<RouteProp<Params, 'WebViewer'>>();
  const {url, postData} = route.params;

  const [loading, setLoading] = useState(true);

  return (
    <DrawerLayout>
      {loading && <FullScreenLoader transparent />}
      <WebViewer
        url={url}
        postData={postData}
        onLoadEnd={() => setLoading(false)}
      />
    </DrawerLayout>
  );
};
