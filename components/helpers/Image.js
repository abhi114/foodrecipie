import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";

const CachedImage = (props) => {
  const { uri, style, ...rest } = props;

  return (
    <Image
      style={[styles.image, style]}
      source={{ uri }}
      contentFit="cover" // similar to resizeMode "cover"
      transition={300} // optional: fade transition in milliseconds
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    // default styles can be added here if needed
  },
});

export default CachedImage;
