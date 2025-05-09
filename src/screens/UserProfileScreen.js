import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UserProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("ক্যামেরা পারমিশন পাওয়া যায়নি!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    alert("প্রোফাইল সংরক্ষণ হয়েছে!");
    // এখানে আপনি পরবর্তীতে ডেটাবেজে পাঠাতে পারেন
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>আপনার প্রোফাইল</Text>

      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.addPhotoText}>📷 ছবি যোগ করুন</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="নাম" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="লিঙ্গ (পুরুষ/মহিলা)" value={gender} onChangeText={setGender} />
      <TextInput style={styles.input} placeholder="ইমেইল" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="ফোন নাম্বার" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="ঠিকানা" value={address} onChangeText={setAddress} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>💾 সংরক্ষণ করুন</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  addPhotoText: {
    fontSize: 14,
    color: '#555'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
