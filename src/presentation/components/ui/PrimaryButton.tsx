import {Button, ButtonProps} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      mode={props.mode || 'contained'}
      contentStyle={styles.content} // cambia alto
      style={[styles.button, props.style]} // cambia borderRadius
      labelStyle={styles.label}
      textColor="white"
      theme={{
        colors: {
          primary: '#0090D7',
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12, // <- Corner radius
  },
  content: {
    height: 68, // <- Alto del botón
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: '100',
  },
});

export default PrimaryButton;
