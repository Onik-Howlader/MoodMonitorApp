import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MoodSelectionScreen = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState(null); // Mood state

  const moods = [
    { label: 'Happy', emoji: '😄' },
    { label: 'Sad', emoji: '😢' },
    { label: 'Angry', emoji: '😠' },
    { label: 'Calm', emoji: '😌' },
    { label: 'Confused', emoji: '😕' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>আপনার বর্তমান মুড নির্বাচন করুন:</Text>

      {/* Iterate through moods and display them */}
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.label}
          style={[
            styles.moodButton, // Default styles
            selectedMood === mood.label && styles.selectedMood // Highlight selected mood
          ]}
          onPress={() => {
            setSelectedMood(mood.label); // Update the selected mood state
            navigation.navigate('Tips', { selectedMood: mood.label }); // Navigate to Tips screen with selected mood
          }}
        >
          <Text style={styles.emoji}>{mood.emoji}</Text>
          <Text style={styles.moodLabel}>{mood.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MoodSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20, backgroundColor: '#f0f4ff'
  },
  title: {
    fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333'
  },
  moodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    width: '80%',
    justifyContent: 'center'
  },
  selectedMood: {
    backgroundColor: '#a5b4fc' // Highlight the selected mood button
  },
  emoji: {
    fontSize: 24, marginRight: 10
  },
  moodLabel: {
    fontSize: 18, color: '#222'
  }
});
