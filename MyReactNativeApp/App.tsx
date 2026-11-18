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

  // State for Feedback Banner Message
  const [strFeedbackMessage, setStrFeedbackMessage] = useState<string | null>(null);
  const [strFeedbackType, setStrFeedbackType] = useState<'error' | 'success'>('error');
  const [strEditingId, setStrEditingId] = useState<string | null>(null);
  // State for Search and Filter
  const [strSearchQuery, setStrSearchQuery] = useState<string>('');
  const [strSelectedFilter, setStrSelectedFilter] = useState<string>('All');

 const handleSaveMenuItem = () => {
    if (!strDishName.trim() || !strDescription.trim() || !strPrice.trim()) {
      setStrFeedbackMessage('Missing Information: Please fill in all fields before saving.');
      setStrFeedbackType('error');
      return;
    }

    const numParsedPrice = parseFloat(strPrice);
    if (isNaN(numParsedPrice) || numParsedPrice <= 0) {
      setStrFeedbackMessage('Invalid Price: Please enter a valid numeric price greater than 0.');
      setStrFeedbackType('error');
      return;
    }

    if (strEditingId) {
      // --- UPDATE EXISTING ITEM ---
      setArrMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.id === strEditingId
            ? {
                ...item,
                dishName: strDishName.trim(),
                description: strDescription.trim(),
                course: strCourse,
                price: numParsedPrice.toFixed(2),
              }
            : item
        )
      );
      setStrFeedbackMessage(`Success: "${strDishName.trim()}" has been updated!`);
      setStrEditingId(null); // Clear editing mode
    } else {
      // --- ADD NEW ITEM ---
      const objNewDish: MenuItem = {
        id: Date.now().toString(),
        dishName: strDishName.trim(),
        description: strDescription.trim(),
        course: strCourse,
        price: numParsedPrice.toFixed(2),
      };
      setArrMenuItems((prevItems) => [objNewDish, ...prevItems]);
      setStrFeedbackMessage(`Success: "${strDishName.trim()}" has been added to the menu!`);
    }

    setStrFeedbackType('success');
    
    // Reset Form Fields
    setStrDishName('');
    setStrDescription('');
    setStrCourse('Starter');
    setStrPrice('');
  };

  // Handler to load an item into the form for editing
  const handleEditItem = (item: MenuItem) => {
    setStrEditingId(item.id);
    setStrDishName(item.dishName);
    setStrDescription(item.description);
    setStrCourse(item.course);
    setStrPrice(item.price);
    setStrFeedbackMessage(`Editing "${item.dishName}"... Make your changes below.`);
    setStrFeedbackType('error'); // using error/warning style banner for notice
  };

  // Handler to delete a menu item
  const handleDeleteItem = (id: string, name: string) => {
    setArrMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setStrFeedbackMessage(`Deleted: "${name}" has been removed from the menu.`);
    setStrFeedbackType('error');
    
    // If the user was currently editing this item, clear the form
    if (strEditingId === id) {
      setStrEditingId(null);
      setStrDishName('');
      setStrDescription('');
      setStrCourse('Starter');
      setStrPrice('');
    }
  };

  // Filter and Search Logic
  const filteredMenuItems = arrMenuItems.filter((item) => {
    const matchesSearch = item.dishName.toLowerCase().includes(strSearchQuery.toLowerCase());
    const matchesFilter = strSelectedFilter === 'All' || item.course === strSelectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Statistics Calculations
  const totalItemsCount = arrMenuItems.length;
  const averagePrice = totalItemsCount > 0
    ? (arrMenuItems.reduce((sum, item) => sum + parseFloat(item.price), 0) / totalItemsCount).toFixed(2)
    : '0.00';
  const starterCount = arrMenuItems.filter((i) => i.course === 'Starter').length;
  const mainCount = arrMenuItems.filter((i) => i.course === 'Main').length;
  const dessertCount = arrMenuItems.filter((i) => i.course === 'Dessert').length;

 // Component to Render Individual Item with Edit/Delete Actions
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.dishName}</Text>
        <Text style={styles.cardPrice}>R {item.price}</Text>
      </View>
      <Text style={styles.cardBadge}>{item.course}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>

      {/* Action Buttons Row */}
      <View style={styles.cardActionRow}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => handleEditItem(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => handleDeleteItem(item.id, item.dishName)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
          {/* Visual Feedback Banner */}
          {strFeedbackMessage && (
            <View
              style={[
                styles.feedbackBanner,
                strFeedbackType === 'error' ? styles.errorBanner : styles.successBanner,
              ]}
            >
              <Text style={styles.feedbackText}>{strFeedbackMessage}</Text>
            </View>
          )}
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
            
            {/* ========================================================
              * PICKER COMPONENT IMPLEMENTATION & COMMENTS:
              * The Picker component lets users select a course category
              * (Starter, Main Course, or Dessert) from a dropdown list.
              * ======================================================== */}
            <View style={styles.pickerWrapper}>
              <Picker
                // Binds the selected value to our strCourse state variable
                selectedValue={strCourse}
                // Updates state whenever a new option is chosen from the dropdown
                onValueChange={(itemValue) => setStrCourse(itemValue)}
                style={styles.picker}
                // Sets dropdown arrow color for cross-platform compatibility
                dropdownIconColor="#ffffff"
              >
                {/* Picker Items representing the selectable course options */}
                <Picker.Item label="Starter" value="Starter" color={Platform.OS === 'ios' ? '#fff' : '#000'} />
                <Picker.Item label="Main Course" value="Main" color={Platform.OS === 'ios' ? '#fff' : '#000'} />
                <Picker.Item label="Dessert" value="Dessert" color={Platform.OS === 'ios' ? '#fff' : '#000'} />
              </Picker>
            </View>
            {/* ======================================================== */}

            <Text style={styles.label}>Price (ZAR) *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 250.00"
              placeholderTextColor="#888"
              value={strPrice}
              onChangeText={setStrPrice}
              keyboardType="decimal-pad"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSaveMenuItem} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>
           {strEditingId ? 'Update Menu Item' : 'Add Menu Item'}
          </Text>
          </TouchableOpacity>
          </View>

          {/* Search and Filter Section */}
          <View style={styles.formCard}>
            <Text style={styles.sectionHeader}>Search & Filter Menu</Text>

            <Text style={styles.label}>Search by Dish Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Type to search..."
              placeholderTextColor="#888"
              value={strSearchQuery}
              onChangeText={setStrSearchQuery}
            />

            <Text style={styles.label}>Filter by Course</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={strSelectedFilter}
                onValueChange={(itemValue) => setStrSelectedFilter(itemValue)}
                style={styles.picker}
                dropdownIconColor="#ffffff"
              >
                <Picker.Item label="All Courses" value="All" color={Platform.OS === 'ios' ? '#fff' : '#000'} />
                <Picker.Item label="Starter" value="Starter" color={Platform.OS === 'ios' ? '#fff' : '#000'} />
                <Picker.Item label="Main Course" value="Main" color={Platform.OS === 'ios' ? '#fff' : '#000'} />
                <Picker.Item label="Dessert" value="Dessert" color={Platform.OS === 'ios' ? '#fff' : '#000'} />
              </Picker>
            </View>

            {(strSearchQuery !== '' || strSelectedFilter !== 'All') && (
              <TouchableOpacity
                style={styles.clearFilterButton}
                onPress={() => {
                  setStrSearchQuery('');
                  setStrSelectedFilter('All');
                }}
              >
                <Text style={styles.clearFilterText}>Clear Search & Filters</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Menu Statistics Section */}
          <View style={styles.statsCard}>
            <Text style={styles.sectionHeader}>Menu Statistics Overview</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{totalItemsCount}</Text>
                <Text style={styles.statLabel}>Total Items</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>R {averagePrice}</Text>
                <Text style={styles.statLabel}>Average Price</Text>
              </View>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownText}>Starters: {starterCount}</Text>
              <Text style={styles.breakdownText}>Mains: {mainCount}</Text>
              <Text style={styles.breakdownText}>Desserts: {dessertCount}</Text>
            </View>
          </View>

          {/* Menu Statistics Section */}
          <View style={styles.statsCard}>
            <Text style={styles.sectionHeader}>Menu Statistics Overview</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{totalItemsCount}</Text>
                <Text style={styles.statLabel}>Total Items</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>R {averagePrice}</Text>
                <Text style={styles.statLabel}>Average Price</Text>
              </View>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownText}>Starters: {starterCount}</Text>
              <Text style={styles.breakdownText}>Mains: {mainCount}</Text>
              <Text style={styles.breakdownText}>Desserts: {dessertCount}</Text>
            </View>
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
                data={filteredMenuItems}
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
  feedbackBanner: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  errorBanner: {
    backgroundColor: '#3b181a',
    borderColor: '#f5c2c7',
  },
  successBanner: {
    backgroundColor: '#133926',
    borderColor: '#badbcc',
  },
  feedbackText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2c2c2c',
    paddingTop: 10,
  },
  editButton: {
    backgroundColor: '#335577',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#773333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});