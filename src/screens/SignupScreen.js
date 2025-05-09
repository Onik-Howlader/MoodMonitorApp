import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { signUp } from '../services/auth'; // auth.js থেকে সাইনআপ ফাংশন ইম্পোর্ট

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');

  const handleSignup = async () => {
    const user = await signUp(email, password);
    if (user) {
      navigation.navigate('Welcome', { gender });
    } else {
      Alert.alert('Signup Failed', 'একাউন্ট তৈরি করতে সমস্যা হয়েছে');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>একাউন্ট তৈরি করুন</Text>

      <TextInput
        style={styles.input}
        placeholder="ইমেইল"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="পাসওয়ার্ড"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>জেন্ডার:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="পুরুষ" value="male" />
          <Picker.Item label="মহিলা" value="female" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>সাইন আপ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F3F8FF' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 12, marginBottom: 15, backgroundColor: '#fff'
  },
  label: { marginTop: 10, marginBottom: 5, fontWeight: 'bold' },
  pickerWrapper: {
    backgroundColor: '#fff', borderRadius: 10, borderWidth: 1,
    borderColor: '#ccc', marginBottom: 15
  },
  picker: { height: 50, width: '100%' },
  button: {
    backgroundColor: '#4CAF50', padding: 15, borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
