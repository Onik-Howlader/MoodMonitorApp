import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const NoteScreen = ({ navigation }) => {
  const [note, setNote] = useState('');

  const handleSaveNote = () => {
    // Save the note to database or any storage (LocalStorage, Firebase, etc.)
    console.log('Saved note:', note);
    navigation.goBack(); // Navigate back to previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>আপনার নোট লিখুন:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="এখানে নোট লিখুন..."
        multiline={true}
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Text style={styles.saveButtonText}>নোট সেভ করুন</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteScreen;

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
  textInput: {
    width: '100%',
    height: 150,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
