import { useState } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import * as Papicons from 'papicons';

export default function App() {
  const [color, setColor] = useState('#000');
  const [size, setSize] = useState<number | undefined>(50);
  const [opacity, setOpacity] = useState<number>(1);

  return (
    <View style={styles.flex}>
      <Papicons.Papicons name="Chair" size={80}/>
      <Papicons.Papicons name={"Accessibility"} size={80}/>
      <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
        {Object.keys(Papicons).map((iconName) => {
          const IconComponent = Papicons[iconName as keyof typeof Papicons];
          return (
            <View style={styles.card} key={iconName}>
              <IconComponent size={size} color={color} opacity={opacity}/>
            </View>
          );
        })}
      </ScrollView>
      <Button
        title={'Change Color'}
        onPress={() => {
          setColor(color === '#000' ? '#f00' : '#000');
        }}
      />
      <Button
        title={'Change Size'}
        onPress={() => {
          setSize(size === 50 ? 24 : 50);
        }}
      />
      <Button
        title={'Unset size'}
        onPress={() => {
          setSize(undefined);
        }}
      />
      <Button
        title={'Change Opacity'}
        onPress={() => {
          setOpacity(opacity === 1 ? 0.5 : 1);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginTop: 40,
  },
  container: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 10,
    paddingTop: 80,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
