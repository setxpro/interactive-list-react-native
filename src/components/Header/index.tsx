import { View, Text } from 'react-native';
import { styles } from './styles';

function Header() {
  return (
        <View style={styles.container}>
            <Text style={styles.title}>Categorias</Text>
            <Text style={styles.subtitle}>Define a sequência de assuntos que você mais gosta no topo da lista.</Text>
        </View>
  );
}

export default Header;