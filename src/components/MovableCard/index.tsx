import React, { useState } from 'react';
import Card, { CardProps } from '../Card';
import { Gesture, GestureDetector
} from 'react-native-gesture-handler'

import Animated, {
    SharedValue,
    runOnJS,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedReaction
} from 'react-native-reanimated';
import { styles } from './styles';

type Props = {
  data: CardProps;
  cardsPosition: SharedValue<number[]>;
  scrollY: SharedValue<number>;
  cardsCount: number;
}

function MovableCard({ data, cardsPosition, scrollY, cardsCount }: Props)
{
    const [moving, setMoving] = useState(false);
    const top = useSharedValue(cardsPosition.value[data.id] * 100)


    function objectMove(positions: number[], from: number, to: number)
    {
        'worklet'; // flag with animation
        const newPositions = Object.assign({}, positions);

        for(const id in positions)
        {
            if(positions[id] === from) 
            {
                newPositions[id] = to;
            }
            if(positions[id] === to) 
            {
                newPositions[id] = from;
            }
        }
        
        return newPositions;
    }

    useAnimatedReaction(() => cardsPosition.value[data.id], (currentPosition, previusPosition) => {
        if (currentPosition !== previusPosition)
        {
            if(!moving) 
            {
                top.value = withSpring(currentPosition * 100);
            }
        }
    }, [moving])

    const longPressGesture = Gesture
    .LongPress()
    .onStart(() => {
        runOnJS(setMoving)(true);
    })
    .minDuration(200);

    const panGesture = Gesture
    .Pan()
    .manualActivation(true)
    .onTouchesMove((_, state) => {
        moving ? state.activate() : state.fail();
    })
    .onUpdate((event) => {
        const positionY = event.absoluteY + scrollY.value;
        top.value = positionY - 100;
        const startPositionList = 0;
        const endPositionList = cardsCount - 1;
        const currentPosition = Math.floor(positionY / 100);

        'worklet'; // flag with animation
        const newPosition = Math.max(startPositionList, Math.min(currentPosition, endPositionList));

        if(newPosition !== cardsPosition.value[data.id]) 
        {
            // troca o cartão de lugar

            cardsPosition.value = objectMove(cardsPosition.value, cardsPosition.value[data.id], newPosition);
        }

    })
    .onFinalize(() => {

        const newPosition = cardsPosition.value[data.id] * 100;
        top.value = withSpring(newPosition);

        runOnJS(setMoving)(false);
    })
    .simultaneousWithExternalGesture(longPressGesture)


    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: top.value - 100,
            zIndex: moving ? 1 : 0,
            opacity: withSpring(moving ? 1 : 0.4)
        }
    }, [moving])

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <GestureDetector gesture={Gesture.Race(panGesture, longPressGesture)}>
            <Card data={data}/>
            </GestureDetector>
        </Animated.View>
    )
}
export default MovableCard;