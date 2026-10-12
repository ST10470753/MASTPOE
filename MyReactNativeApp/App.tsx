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

  