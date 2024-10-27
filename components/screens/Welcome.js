import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated,{useSharedValue,withSpring} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
const Welcome = () => {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);
    const navigation = useNavigation();
    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;
       setTimeout(() => {
         ring1padding.value = withSpring(hp(5));
       }, 100);
       setTimeout(() => {
         ring2padding.value = withSpring(hp(5.5));
       }, 300);
       setTimeout(() => {
        navigation.navigate('Home')
       }, 2500);
    
      return () => {
        
      }
    }, [])
    
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
      <View className="flex-1 justify-center items-center space-y-2 bg-amber-500">
        <StatusBar style="light" />

        {/* Logo image with rings */}
        <Animated.View
          className="bg-white/20 rounded-full "
          style={{ padding: ring2padding }}
        >
          <Animated.View
            className="bg-white/20 rounded-full "
            style={{ padding: ring1padding }}
          >
            <Image
              source={require("../../assets/welcome2.png")}
              style={{ width: hp(25), height: hp(25) }}
            />
          </Animated.View>
        </Animated.View>

        <View className="flex items-center space-y-3">
          <Text
            className="font-bold text-white tracking-widest"
            style={{ fontSize: hp(7) }}
          >
            Foody
          </Text>
          <Text
            className="font-medium text-white tracking-widest"
            style={{ fontSize: hp(2) }}
          >
            Food Is Always Right
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Welcome