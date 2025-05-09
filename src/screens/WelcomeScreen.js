import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ route, navigation }) => {
  const gender = route.params?.gender || 'male';
  const message = gender === 'female' ? 'স্বাগতম, মহিলা!' : 'স্বাগতম, পুরুষ!';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Text style={styles.subtext}>আপনার আজকের মুড সিলেক্ট করুন</Text>

      <TouchableOpacity onPress={() => navigation.navigate('MoodSelection')}>
        <Text style={styles.link}>➡ মুড নির্বাচন করুন</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MoodGraph')}>
  <Text style={styles.link}>📊 মুড গ্রাফ দেখুন</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('Note')}>
  <Text style={styles.link}>📝 নোট লিখুন</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
  <Text style={styles.link}>👤 প্রোফাইল দেখুন / সম্পাদনা করুন</Text>
</TouchableOpacity>


    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8F0FF' },
  text: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtext: { fontSize: 16, color: '#555' },
  link: { fontSize: 18, marginTop: 30, color: 'blue' }
});
