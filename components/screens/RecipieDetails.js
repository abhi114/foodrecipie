import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import CachedImage from '../helpers/Image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UserIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
const RecipieDetails = (props) => {
    let item = props.route.params;
    const [isFav,setisfav] = useState(false);
    const navigation = useNavigation();
    const [meal,setMeal] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        //console.log(item)
       getMealData(item.idMeal)
        setLoading(false);
      return () => {
        
      }
    }, [])
    
    const getMealData = async (id) => {
      try {
        //console.log("id is" + id);
        const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        //console.log('got recipies' + JSON.stringify(response.data.meals[0]));
        if (response && response.data) {
          setMeal(response.data.meals[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const getYoutubeVideoId = (url)=>{
         const regex = /v=([^&]+)/;
         const match = url.match(regex);
         if (match && match[1]) {
            //console.log(match[1]);
           return match[1];
         }
         return null;
    }
    const IngridientsIndexes = (meal) =>{
        if(!meal){
            return [];
        }
        let indexes = [];
        for(let i=1;i<=20;i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }
        return indexes;
    }
  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: hp(8) }}
    >
      <StatusBar style="light" />

      {/* Hero Image Section */}
      <View className="relative">
        <Animated.View className="w-full" sharedTransitionTag="1">
          <CachedImage
            uri={item.strMealThumb}
            style={{
              width: wp(100),
              height: hp(45),
            }}
            className="bg-black/5"
          />
          {/* Gradient Overlay */}
          <View className="absolute inset-0 bg-black/20" />
        </Animated.View>

        {/* Navigation Buttons */}
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          className="w-full absolute flex-row justify-between items-center pt-14 px-4"
        >
          <TouchableOpacity
            className="p-3 rounded-full bg-white/90 shadow-lg"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={hp(3)} strokeWidth={3} color="#fbbf24" />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-3 rounded-full bg-white/90 shadow-lg"
            onPress={() => setisfav(!isFav)}
          >
            <HeartIcon
              size={hp(3)}
              strokeWidth={3}
              color={isFav ? "#ef4444" : "#6b7280"}
              fill={isFav ? "#ef4444" : "#808080"}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Content Container */}
      <View className="px-4 pt-8 -mt-14 bg-white rounded-t-[30px]">
        {loading ? (
          <Loading size="large" className="mt-16" />
        ) : (
          <View className="space-y-6">
            {/* Title Section */}
            {meal?.strMeal != null && (
              <Animated.View
                entering={FadeInDown.duration(700).springify().damping(12)}
                className="space-y-2"
              >
                <Text
                  className="font-bold text-neutral-800"
                  style={{ fontSize: hp(3) }}
                >
                  {meal?.strMeal}
                </Text>
                <Text
                  className="font-medium text-amber-600"
                  style={{ fontSize: hp(2) }}
                >
                  {meal?.strArea} Cuisine
                </Text>
              </Animated.View>
            )}

            {/* Stats Cards */}
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
              className="flex-row justify-between"
            >
              {[
                { icon: ClockIcon, value: "35", unit: "min" },
                { icon: UsersIcon, value: "03", unit: "Servings" },
                { icon: FireIcon, value: "103", unit: "Cal" },
                { icon: Square3Stack3DIcon, value: "", unit: "Easy" },
              ].map((stat, index) => (
                <View key={index} className="bg-amber-50 rounded-3xl p-2">
                  <View
                    style={{ height: hp(6.5), width: hp(6.5) }}
                    className="bg-white rounded-full items-center justify-center mb-1"
                  >
                    <stat.icon size={hp(3.5)} strokeWidth={2} color="#f59e0b" />
                  </View>
                  <View className="items-center space-y-1">
                    <Text
                      className="font-bold text-neutral-700"
                      style={{ fontSize: hp(2) }}
                    >
                      {stat.value}
                    </Text>
                    <Text
                      className="font-medium text-neutral-600"
                      style={{ fontSize: hp(1.5) }}
                    >
                      {stat.unit}
                    </Text>
                  </View>
                </View>
              ))}
            </Animated.View>

            {/* Ingredients Section */}
            {IngridientsIndexes(meal).length > 0 && (
              <Animated.View
                entering={FadeInDown.delay(200)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="space-y-4"
              >
                <Text
                  className="font-bold text-neutral-800"
                  style={{ fontSize: hp(2.5) }}
                >
                  Ingredients
                </Text>
                <View className="space-y-3">
                  {IngridientsIndexes(meal).map((i) => (
                    <View
                      key={i}
                      className="flex-row items-center space-x-4 bg-amber-50/50 p-3 rounded-xl"
                    >
                      <View className="h-2 w-2 rounded-full bg-amber-400" />
                      <View className="flex-row space-x-2 flex-1">
                        <Text
                          className="font-bold text-neutral-800"
                          style={{ fontSize: hp(1.7) }}
                        >
                          {meal[`strMeasure${i}`]}
                        </Text>
                        <Text
                          className="text-neutral-700"
                          style={{ fontSize: hp(1.7) }}
                        >
                          {meal[`strIngredient${i}`]}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </Animated.View>
            )}

            {/* Instructions Section */}
            {meal?.strInstructions && (
              <Animated.View
                entering={FadeInDown.delay(300)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="space-y-4"
              >
                <Text
                  className="font-bold text-neutral-800"
                  style={{ fontSize: hp(2.5) }}
                >
                  Instructions
                </Text>
                <View className="space-y-4">
                  {meal?.strInstructions
                    ?.split(".")
                    .filter(Boolean)
                    .map((instruction, index) => (
                      <View key={index} className="flex-row space-x-4">
                        <View className="h-8 w-8 rounded-full bg-amber-100 items-center justify-center">
                          <Text className="font-bold text-amber-800">
                            {index + 1}
                          </Text>
                        </View>
                        <View className="flex-1">
                          <Text
                            className="text-neutral-700"
                            style={{ fontSize: hp(1.8) }}
                          >
                            {instruction.trim()}.
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
              </Animated.View>
            )}
            {/* Recipe Video Section */}
            {meal?.strYoutube && (
              <Animated.View
                entering={FadeInDown.delay(400)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="space-y-4"
              >
                <Text
                  className="font-bold text-neutral-800"
                  style={{ fontSize: hp(2.5) }}
                >
                  Recipe Video
                </Text>
                <View className="rounded-2xl overflow-hidden bg-neutral-100">
                  <YoutubeIframe
                    videoId={getYoutubeVideoId(meal.strYoutube)}
                    height={hp(30)}
                  />
                </View>
              </Animated.View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default RecipieDetails