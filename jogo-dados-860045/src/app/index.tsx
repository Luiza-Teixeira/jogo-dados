import { SafeAreaView, StyleSheet } from 'react-native';
import JogoDados from '../components/JogoDados';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <JogoDados />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});