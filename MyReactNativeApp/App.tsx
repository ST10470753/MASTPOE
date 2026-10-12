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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#1f1f1f',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d4af37',
    letterSpacing: 0.5,
  },
  appSubtitle: {
    fontSize: 13,
    color: '#aaaaaa',
    marginTop: 2,
  },
  scrollContainer: {
    padding: 16,
  },
  formCard: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2c2c2c',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ccc',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#d4af37',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listSection: {
    marginBottom: 30,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  countBadge: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  countText: {
    color: '#d4af37',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    backgroundColor: '#1e1e1e',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2c2c2c',
    marginTop: 6,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubtitle: {
    color: '#888888',
    fontSize: 13,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2c2c2c',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#d4af37',
  },
  cardBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2c2c2c',
    color: '#aaa',
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 6,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  cardDescription: {
    fontSize: 13,
    color: '#ccc',
    lineHeight: 18,
  },
});