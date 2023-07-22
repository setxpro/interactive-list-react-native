import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import Header from "../../components/Header";
import { CARDS } from "../../mocks/cards";
import MovableCard from "../../components/MovableCard";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const List = () => {
  const scrollY = useSharedValue(0);
  const cardsPosition = useSharedValue(listToObject(CARDS));

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset?.y;
  });

  // Não precisa criar a tipagem separada
  function listToObject(list: typeof CARDS)
  {
    // Convert array to object
    const listOfCards = Object.values(list);

    const object:any = {};

    listOfCards.forEach((card, index) => {
      object[card.id] = index;
    })

    return object;
  }

  return (
    <View style={styles.container}>
      <Header />

      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ height: CARDS.length * 100}} // altura do cartão
        style={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {CARDS.map((item) => (
          <MovableCard
            key={item.id}
            data={item}
            scrollY={scrollY}
            cardsPosition={cardsPosition}
            cardsCount={CARDS.length}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default List;
