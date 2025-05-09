// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { login } from '../services/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate('Welcome');
    } catch (error) {
      Alert.alert('লগইন ব্যর্থ হয়েছে', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Mood Monitor</Text>
      <Text style={styles.subtitle}>লগইন করুন</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>লগইন</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>নতুন ইউজার? রেজিস্টার করুন</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={{ color: 'blue', marginTop: 10 }}>🔓 পাসওয়ার্ড ভুলে গেছেন?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F3F8FF' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 20, color: '#333' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 12, marginBottom: 15, backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#4A90E2', padding: 15, borderRadius: 10,
    alignItems: 'center', marginTop: 10
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 15, textAlign: 'center', color: '#4A90E2' },
});
