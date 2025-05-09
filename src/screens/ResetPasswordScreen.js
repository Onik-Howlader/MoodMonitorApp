import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email.includes('@')) {
      Alert.alert('ভুল ইমেইল', 'একটি সঠিক ইমেইল দিন।');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('সফল', 'পাসওয়ার্ড রিসেট ইমেইল পাঠানো হয়েছে।');
      navigation.goBack();
    } catch (error) {
      Alert.alert('ত্রুটি', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 পাসওয়ার্ড রিসেট</Text>

      <TextInput
        style={styles.input}
        placeholder="আপনার ইমেইল দিন"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>📩 রিসেট ইমেইল পাঠান</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F3F8FF' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 12, marginBottom: 15, backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#FF6F61', padding: 15, borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
