import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Define Interface for Menu Item Structure
interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
}

export default function App() {
  // State for Form Inputs
  const [strDishName, setStrDishName] = useState<string>('');
  const [strDescription, setStrDescription] = useState<string>('');
  const [strCourse, setStrCourse] = useState<string>('Starter');
  const [strPrice, setStrPrice] = useState<string>('');

  // State for Menu Items Array
  const [arrMenuItems, setArrMenuItems] = useState<MenuItem[]>([]);

  // Handler to Validate and Add Menu Item
  const handleAddMenuItem = () => {
    if (!strDishName.trim() || !strDescription.trim() || !strPrice.trim()) {
      Alert.alert(
        'Missing Information',
        'Please fill in all fields before adding a menu item.'
      );
      return;
    }

    const numParsedPrice = parseFloat(strPrice);
    if (isNaN(numParsedPrice) || numParsedPrice <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid numeric price greater than 0.');
      return;
    }

    const objNewDish: MenuItem = {
      id: Date.now().toString(),
      dishName: strDishName.trim(),
      description: strDescription.trim(),
      course: strCourse,
      price: numParsedPrice.toFixed(2),
    };

    setArrMenuItems((prevItems) => [objNewDish, ...prevItems]);

    Alert.alert('Success', `"${strDishName.trim()}" has been added to the menu!`);
    setStrDishName('');
    setStrDescription('');
    setStrCourse('Starter');
    setStrPrice('');
  };

  