import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

interface WebViewerProps {
  url: string;
  postData?: string;
  onLoadEnd?: () => void;
}

export const WebViewer: React.FC<WebViewerProps> = ({url, postData, onLoadEnd}) => {
  return (
    <View style={styles.container}>
      <WebView
        source={
          postData
            ? {
                uri: url,
                method: 'POST',
                body: postData,
              }
            : {uri: url}
        }
        style={{flex: 1}}
        onLoadEnd={onLoadEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

