import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import Categories from './categories/Categories';
import axios from 'axios';
import Recipies from './Recipies';
const Home = () => {
  const [categories,setCategories] = useState([]);
  const [meals,setMeals] = useState([]);
  useEffect(() => {
    getCategories()
    getRecipies();
    return () => {
      
    }
  }, [])
  const handleChangeCategory = (category)=>{
    getRecipies(category)
    setActiveCategory(category);
    setMeals([])
  }
  const getCategories = async ()=>{
    try {
      const response =await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php",
      );
      //console.log('got categories' + JSON.stringify(response.data));
      if(response && response.data){
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
   const getRecipies = async (category="Beef") => {
     try {
       const response = await axios.get(
         `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
       );
       //console.log('got recipies' + JSON.stringify(response.data));
       if (response && response.data) {
         setMeals(response.data.meals);
       }
     } catch (error) {
       console.log(error.message);
     }
   };
  const [activeCategory,setActiveCategory] = useState('Beef');
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../assets/avatar.png")}
            style={{ height: hp(5), width: hp(5.5), borderRadius: 5 }}
          />
          <BellIcon size={hp(4)} color={"gray"} />
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello,Abhishek
          </Text>
          <View>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.8) }}
            >
              Make your own food,
            </Text>
          </View>
          <Text
            className="font-semibold text-neutral-600"
            style={{ fontSize: hp(3.8) }}
          >
            stay at <Text className="text-amber-400"> home</Text>
          </Text>
        </View>
        <View className="mx-4 flex-row items-center justify-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search Any Recipie"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.8) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-4">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>
        <View>
          {categories?.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>
        {/* recipies */}
        <View>
          <Recipies meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home