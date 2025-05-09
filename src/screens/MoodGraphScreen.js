import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const MoodGraphScreen = () => {
  // Dummy data for the mood graph
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], // Weekdays
    datasets: [
      {
        data: [2, 3, 1, 4, 5], // Mood values (e.g., Happy, Sad, etc.)
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>আপনার মুড গ্রাফ:</Text>
      <LineChart
        data={data}
        width={320} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.graph}
      />
    </View>
  );
};

export default MoodGraphScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  graph: {
    marginTop: 20,
    borderRadius: 16,
  },
});
