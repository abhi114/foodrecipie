import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  BellIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  HomeIcon,
  UserIcon,
  Bars3Icon,
  BookmarkIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "react-native-heroicons/outline";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.7;
import Categories from "./categories/Categories";
import axios from "axios";
import Recipies from "./Recipies";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Animation values
  const drawerAnimation = useSharedValue(0);
  const mainContentAnimation = useSharedValue(0);

  useEffect(() => {
    getCategories();
    getRecipies();
    return () => {};
  }, []);

  const handleChangeCategory = (category) => {
    getRecipies(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRecipies = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleDrawer = () => {
    const newValue = isDrawerOpen ? 0 : 1;
    drawerAnimation.value = withSpring(newValue, {
      damping: 15,
      stiffness: 100,
    });
    mainContentAnimation.value = withSpring(newValue, {
      damping: 15,
      stiffness: 100,
    });
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            drawerAnimation.value,
            [0, 1],
            [-DRAWER_WIDTH, 0]
          ),
        },
      ],
    };
  });

  const mainContentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            mainContentAnimation.value,
            [0, 1],
            [0, DRAWER_WIDTH]
          ),
        },
        { scale: interpolate(mainContentAnimation.value, [0, 1], [1, 0.8]) },
      ],
      borderRadius: interpolate(mainContentAnimation.value, [0, 1], [0, 20]),
    };
  });

  const DrawerContent = () => (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          width: DRAWER_WIDTH,
          height: height,
          backgroundColor: "#4f46e5",
          paddingHorizontal: 20,
          paddingTop: 60,
        },
        drawerStyle,
      ]}
    >
      <View className="items-center mb-8">
        <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
          <UserIcon size={40} color="#4f46e5" />
        </View>
        <Text className="text-white text-xl font-bold">John Doe</Text>
        <Text className="text-indigo-200">Premium Member</Text>
      </View>

      <ScrollView className="flex-1">
        <TouchableOpacity className="flex-row items-center py-4">
          <HomeIcon size={24} color="white" />
          <Text className="text-white ml-4 text-lg">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-4">
          <HeartIcon size={24} color="white" />
          <Text className="text-white ml-4 text-lg">Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-4">
          <BookmarkIcon size={24} color="white" />
          <Text className="text-white ml-4 text-lg">Saved Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-4">
          <CogIcon size={24} color="white" />
          <Text className="text-white ml-4 text-lg">Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-4">
          <QuestionMarkCircleIcon size={24} color="white" />
          <Text className="text-white ml-4 text-lg">Help</Text>
        </TouchableOpacity>

        <View className="border-t border-indigo-400 my-4" />

        <TouchableOpacity className="flex-row items-center py-4">
          <ArrowRightOnRectangleIcon size={24} color="white" />
          <Text className="text-white ml-4 text-lg">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-indigo-600">
      <StatusBar style="light" />

      <DrawerContent />

      {/* Main Content */}
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: "white",
          },
          mainContentStyle,
        ]}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          className="mx-4 mt-4"
        >
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={toggleDrawer} className="p-3">
              <Bars3Icon size={30} color="#4f46e5" />
            </TouchableOpacity>
            <TouchableOpacity className="p-3 bg-indigo-100 rounded-full">
              <BellIcon size={25} color="#4f46e5" />
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            <Text className="text-neutral-600">Hello, Chef</Text>
            <Text className="text-2xl font-bold text-neutral-800">
              Make your own food,
            </Text>
            <Text className="text-2xl font-bold text-neutral-800">
              stay at home
            </Text>
          </View>
        </Animated.View>

        {/* Search Bar */}
        <View className="mx-4 mt-6">
          <View className="flex-row items-center bg-indigo-50 rounded-full p-3">
            <MagnifyingGlassIcon size={25} color="#4f46e5" />
            <TextInput
              placeholder="Search recipes..."
              className="flex-1 ml-2 text-neutral-800"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Categories and Recipes */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            className="mt-6"
          >
            {categories?.length > 0 && (
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                handleChangeCategory={handleChangeCategory}
              />
            )}
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="mt-4"
          >
            {meals?.length > 0 && (
              <Recipies meals={meals} categories={categories} />
            )}
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Home;
