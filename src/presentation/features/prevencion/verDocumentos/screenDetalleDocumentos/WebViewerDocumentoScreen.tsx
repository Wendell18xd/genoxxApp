import React, { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import { PdfViewer } from '../../../../components/PdfViewer';

type Params = {
  WebViewerDocumento: { url: string };
};

export const WebViewerDocumentoScreen = () => {
  const route = useRoute<RouteProp<Params, 'WebViewerDocumento'>>();
  const { url } = route.params;

  const extension = url.split('.').pop()?.toLowerCase() ?? '';
  const isPdf = extension === 'pdf';

  useEffect(() => {
    if (!isPdf) {
      Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'No se pudo abrir el documento.');
      });
    }
  }, [url, isPdf]);

  return (
    <DrawerLayout>
      {isPdf && <PdfViewer url={url} />}
    </DrawerLayout>
  );
};


