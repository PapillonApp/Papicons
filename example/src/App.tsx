import { useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import * as Papicons from 'papicons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Palette, Pen, Placeholder } from 'papicons';

const PapiconsExample = () => {
  const insets = useSafeAreaInsets();

  const [color, setColor] = useState('#000');
  const [size, setSize] = useState<number | undefined>(50);
  const [opacity, setOpacity] = useState<number>(1);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <View
        style={{
          height: insets.top + 70,
          borderBottomWidth: 2,
          borderBottomColor: '#EEE',
          paddingTop: insets.top,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image source={require('../assets/papicons.png')}
               style={{ height: 25 }}
               resizeMode={'contain'}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
        }}
      >
        {Object.keys(Papicons.IconNames).map((iconName) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#EEE',
              borderWidth: 2,
              borderRadius: 16,
              width: '21%',
              aspectRatio: 1,
            }}
            key={iconName}
          >
            <Papicons.Papicons
              name={iconName}
              size={size}
              color={color}
              opacity={opacity}
            />
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          height: insets.bottom + 80,
          borderTopWidth: 2,
          borderTopColor: '#EEE',
          paddingBottom: insets.bottom,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ScrollView
          style={{ flex: 1, width: '100%' }}
          horizontal
          contentContainerStyle={{ padding: 16, flexDirection: "row", gap: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#EEE',
              borderWidth: 2,
              padding: 8,
              paddingHorizontal: 16,
              flexDirection: "row",
              gap: 8,
              borderRadius: 32,
            }}
            onPress={() => setSize(size === 32 ? 50 : 32)}
          >
            <Placeholder size={32}/>
            <Text style={{fontSize: 18}}>Size</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#EEE',
              borderWidth: 2,
              padding: 8,
              paddingHorizontal: 16,
              flexDirection: "row",
              gap: 8,
              borderRadius: 32,
            }}
            onPress={() => setColor(color === '#000' ? '#0042DC' : '#000')}
          >
            <Palette size={32}/>
            <Text style={{fontSize: 18}}>Color</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#EEE',
              borderWidth: 2,
              padding: 8,
              paddingHorizontal: 16,
              flexDirection: "row",
              gap: 8,
              borderRadius: 32,
            }}
            onPress={() => setOpacity(opacity === 1 ? 0.5 : 1)}
          >
            <Pen size={32}/>
            <Text style={{fontSize: 18}}>Opacity</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PapiconsExample />
    </SafeAreaProvider>
  );
}
