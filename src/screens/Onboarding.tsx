import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, { JSX, useRef } from 'react';
import { slides } from '../data/constant';
import { navigate } from '../navigation/Navigationutils';

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const ref = useRef<FlatList>(null);
  const { width, height } = useWindowDimensions();

  const Slide = ({
    item,
  }: {
    item: {
      id: number;
      image: ImageSourcePropType | undefined;
      title: string;
      subtitle: string;
    };
  }): JSX.Element => {
    return (
      <View
        style={{
          width: width,
          height: height * 0.75,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Image
          source={item.image}
          style={{ width, height: height * 0.4, resizeMode: 'contain' }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: 'black',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '400',
            color: 'black',
            maxWidth: '70%',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          {item.subtitle}
        </Text>
      </View>
    );
  };

  const Footer = (): JSX.Element => {
    const goToNext = () => {
      if (currentIndex < slides.length - 1) {
        const nextslide = currentIndex + 1;
        const offset = width * nextslide;
        ref.current?.scrollToOffset({ offset });
        setCurrentIndex(nextslide);
      }
    };

    const goToEnd = () => {
      setCurrentIndex(slides.length - 1);
      ref.current?.scrollToOffset({ offset: width * (slides.length - 1) });
    };

    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && {
                  backgroundColor: '#87b5eb',
                  width: 10,
                  height: 10,
                  borderRadius: 50,
                },
              ]}
            />
          ))}
        </View>
        <View style={{ marginBottom: 0 }}>
          {currentIndex === slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  { backgroundColor: 'skyblue' },
                  { borderColor: 'white', borderWidth: 1, borderRadius: 40 },
                ]}
                onPress={() => navigate('Home')}
              >
                <Text
                  style={{ fontWeight: 'bold', fontSize: 15, color: '#ffff' }}
                >
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: 'transparent' }]}
                onPress={goToEnd}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn]} onPress={goToNext}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  return (
    <>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        horizontal={true}
        data={slides}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        style={{ marginHorizontal: 0 }}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={width}
      />
      <Footer />
    </>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: 'orange',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: 0,
  },

  indicator: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#c9cfd2ff',
    marginHorizontal: 5,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
  },
});
