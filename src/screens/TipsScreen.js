import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const sampleTips = {
  Happy: [
    'বন্ধুদের সাথে সময় কাটান।',
    'আপনার অনুভূতি একটি ডায়েরিতে লিখুন।',
    'আজকের দিনটি উদযাপন করুন।'
  ],
  Sad: [
    'একটু হেঁটে আসুন বা গান শুনুন।',
    'কাউকে ফোন করে মনের কথা বলুন।',
    'এক কাপ চা/কফি নিয়ে বিশ্রাম নিন।'
  ],
  Angry: [
    'গভীরভাবে নিঃশ্বাস নিন।',
    'পজিটিভ কিছু পড়ুন বা দেখুন।',
    'আয়নার সামনে নিজের সাথে কথা বলুন।'
  ],
  Calm: [
    'মেডিটেশন চালিয়ে যান।',
    'শান্ত পরিবেশে বই পড়ুন।',
    'আজ নিজেকে সময় দিন।'
  ],
  Confused: [
    'আপনার সমস্যাগুলো লিখে ফেলুন।',
    'একটু ব্রেক নিন।',
    'বিশ্বস্ত কাউকে জিজ্ঞেস করুন।'
  ]
};

const TipsScreen = ({ route }) => {
  const { selectedMood } = route.params;
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTips(sampleTips[selectedMood] || []);
      setLoading(false);
    }, 1000);
  }, [selectedMood]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>আপনার মুড: {selectedMood}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>পরামর্শ:</Text>
          {tips.map((tip, index) => (
            <Text key={index} style={styles.tipText}>• {tip}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default TipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FAFBFF', padding: 20
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  tipBox: {
    backgroundColor: '#fff', padding: 20, borderRadius: 10,
    width: '100%', elevation: 2
  },
  tipTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  tipText: { fontSize: 14, marginBottom: 5 }
});
