import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

interface WebViewerProps {
  url: string;
  postData?: string;
}

export const WebViewer: React.FC<WebViewerProps> = ({url, postData}) => {
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
