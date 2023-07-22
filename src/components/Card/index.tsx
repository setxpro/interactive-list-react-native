import { View, Text } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons'

export type CardProps = {
    id: number;
    text: string;
}

type Props = {
  data: CardProps;
}

function Card({ data }: Props) {
  return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.text}</Text>
            <MaterialIcons name="drag-indicator" size={32} color="#EEE"/>
        </View>
  );
}

export default Card;