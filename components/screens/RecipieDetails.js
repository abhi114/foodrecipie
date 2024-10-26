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
const RecipieDetails = (props) => {
    let item = props.route.params;
    const [isFav,setisfav] = useState(false);
    const navigation = useNavigation();
    const [meal,setMeal] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        console.log(item)
       getMealData(item.idMeal)
        setLoading(false);
      return () => {
        
      }
    }, [])
    
    const getMealData = async (id) => {
      try {
        console.log("id is" + id);
        const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        console.log('got recipies' + JSON.stringify(response.data.meals[0]));
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
            console.log(match[1]);
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
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>
      {/* back button */}
      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          className="p-2 rounded-full ml-5 bg-white items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-5 bg-white items-center justify-center"
          onPress={() => setisfav(!isFav)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFav ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
      {/* meal description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {meal?.strArea}
            </Text>
          </View>
          {/* misc */}
          <View className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  35
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.5) }}
                >
                  min
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  03
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.5) }}
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  103
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.5) }}
                >
                  Cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={"#525252"}
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                ></Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.5) }}
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>
          {/* ingredients */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingridients
            </Text>
            <View className="space-y-2 ml-3">
              {IngridientsIndexes(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    {/* dots */}
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full "
                    />

                    <View
                      style={{ fontSize: hp(1.7) }}
                      className="flex-row space-x-2"
                    >
                      <Text className="font-extrabold text-neutral-700">
                        {meal[`strMeasure` + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600"
                      >
                        {meal[`strIngredient` + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          {/* instructions */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.8) }} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </View>
          {/* recipie video */}
          {meal?.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipie Video
              </Text>
                <View>
                    <YoutubeIframe videoId={getYoutubeVideoId(meal.strYoutube)} height={hp(30)}/>
                </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

export default RecipieDetails