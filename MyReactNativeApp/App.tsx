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

  // Component to Render Individual Item
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.dishName}</Text>
        <Text style={styles.cardPrice}>R {item.price}</Text>
      </View>
      <Text style={styles.cardBadge}>{item.course}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header Bar */}
        <View style={styles.headerContainer}>
          <Text style={styles.appTitle}>Chef Christoffel's Menu</Text>
          <Text style={styles.appSubtitle}>Menu Manager</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {/* Add Menu Item Form */}
          <View style={styles.formCard}>
            <Text style={styles.sectionHeader}>Add New Menu Item</Text>

            <Text style={styles.label}>Dish Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Pan-Seared Salmon"
              placeholderTextColor="#888"
              value={strDishName}
              onChangeText={setStrDishName}
            />

            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="e.g., Served with fresh asparagus and lemon butter sauce."
              placeholderTextColor="#888"
              value={strDescription}
              onChangeText={setStrDescription}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Course Category *</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={strCourse}
                onValueChange={(itemValue) => setStrCourse(itemValue)}
                style={styles.picker}
                dropdownIconColor="#ffffff"
              >
                <Picker.Item label="Starter" value="Starter" color={Platform.OS === 'ios' ? '#fff' : '#000'} />
                <Picker.Item label="Main Course" value="Main" color={Platform.OS === 'ios' ? '#fff' : '#000'} />
                <Picker.Item label="Dessert" value="Dessert" color={Platform.OS === 'ios' ? '#fff' : '#000'} />
              </Picker>
            </View>

            <Text style={styles.label}>Price (ZAR) *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 250.00"
              placeholderTextColor="#888"
              value={strPrice}
              onChangeText={setStrPrice}
              keyboardType="decimal-pad"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleAddMenuItem} activeOpacity={0.8}>
              <Text style={styles.submitButtonText}>Add Menu Item</Text>
            </TouchableOpacity>
          </View>

          {/* Current Menu List Section */}
          <View style={styles.listSection}>
            <View style={styles.listHeaderRow}>
              <Text style={styles.sectionHeader}>Current Menu Items</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>Total: {arrMenuItems.length}</Text>
              </View>
            </View>

            {arrMenuItems.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No menu items added yet.</Text>
                <Text style={styles.emptySubtitle}>Fill out the form above to build tonight's menu offerings.</Text>
              </View>
            ) : (
              <FlatList
                data={arrMenuItems}
                keyExtractor={(item) => item.id}
                renderItem={renderMenuItem}
                scrollEnabled={false}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

});