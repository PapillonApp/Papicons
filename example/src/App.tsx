import { useState } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import * as Papicons from 'papicons';

export default function App() {
  const [color, setColor] = useState('#000');
  const [size, setSize] = useState<number | undefined>(50);

  return (
    <View style={styles.flex}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
        {Object.keys(Papicons).map((iconName) => {
          const IconComponent = Papicons[iconName as keyof typeof Papicons];
          return (
            <View style={styles.card} key={iconName}>
              <IconComponent width={size} height={size} fill={color} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
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
