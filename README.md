# Chef Christoffel's Menu Manager (MASTPOE)

A cross-platform mobile and web menu management application built with **React Native**, **Expo**, and **TypeScript**. Designed for private chef Christoffel, the application streamlines menu curation, dynamic item filtering, and real-time menu analytics.

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#-installation--setup)
- [Changelog (Updates Since Part 2)](#-changelog-updates-since-part-2)
- [Refactoring & Code Quality Improvements](#-refactoring--code-quality-improvements)
- [References](#-references)

---

## ✨ Features
- **Full CRUD Menu Management**: Add, edit, and delete menu items with Dish Name, Description, Course Category (`Starter`, `Main Course`, `Dessert`), and Price (ZAR).
- **Dynamic Search & Filtering**: Filter menu items in real-time by dish name or course category, with a one-click reset button to restore the full list.
- **Menu Statistics Dashboard**: Live calculation of total menu items, average dish price, and item count breakdown per course.
- **Input Validation & Feedback**: Ensures valid pricing and required fields before saving, paired with auto-dismissing visual feedback banners.
## 🎥 Video Demonstration
You can watch a full walkthrough and demonstration of Chef Christoffel's Menu Manager in action here:
- [Watch the Video Demonstration on YouTube](https://youtu.be/NAtCWlwLI2Y)

---

## 🛠 Tech Stack
- **Framework**: React Native (Expo SDK 57)[cite: 3]
- **Language**: TypeScript
- **UI Components**: `@react-native-picker/picker`, React Native Core Components (`FlatList`, `ScrollView`, `KeyboardAvoidingView`)
- **Web Support**: `react-native-web`, `@expo/metro-runtime`[cite: 2]

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ST10470753/MASTPOE.git](https://github.com/ST10470753/MASTPOE.git)
   cd MASTPOE/MyReactNativeApp
   ```[cite: 2, 12]

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```[cite: 2]

3. **Start the Expo development server:**
   ```bash
   npx expo start --clear
   ```
   - Press **`w`** to open in your web browser.
   - Scan the QR code using the **Expo Go** app on Android or iOS.

---

## 📝 Changelog (Updates Since Part 2)

The following features and enhancements were implemented in the final submission following Part 2[cite: 11]:

### 1. Search and Filter Functionality
- Added real-time text search (`strSearchQuery`) allowing the chef to filter dishes by name regardless of case sensitivity[cite: 5].
- Added a course filter dropdown (`strSelectedFilter`) to filter items by `All`, `Starter`, `Main`, or `Dessert`[cite: 5].
- Implemented a conditional **Clear Search & Filters** button that resets both search and filter states simultaneously[cite: 5].

### 2. Menu Statistics Overview
- Added a dedicated **Menu Statistics Overview** card displaying:
  - **Total Items**: Live count of all dishes currently stored in `arrMenuItems`[cite: 5].
  - **Average Price**: Real-time calculation of the mean price across all menu items formatted to two decimal places in ZAR (`R`)[cite: 5].
  - **Course Breakdown**: Dynamic individual counters tracking the exact number of **Starters**, **Mains**, and **Desserts**[cite: 5].

### 3. User Experience (UX) Enhancements
- **Auto-Dismissing Notifications**: Integrated a `useEffect` timer hook that automatically clears success and error banners after 4 seconds to reduce screen clutter[cite: 9].
- **Cancel Edit Workflow**: Added a conditional **Cancel Edit** button when editing an existing item, allowing the user to safely exit edit mode without saving unwanted changes[cite: 9].
- **Contextual Empty States**: Updated the list empty state to distinguish between an empty menu and a search/filter query with zero matches[cite: 9].

---

## 🔧 Refactoring & Code Quality Improvements

During final development, the codebase was refactored to improve modularity, readability, and maintainability[cite: 9, 11]:

- **Component Modularization (`MenuItemCard`)**: Extracted the menu card rendering logic from the main `App` component into a standalone, strongly-typed `MenuItemCard` functional component (`React.FC<MenuItemCardProps>`)[cite: 9].
- **Reusable Helper Function (`resetFormFields`)**: Consolidated repeated form-clearing state setters across `handleSaveMenuItem`, `handleDeleteItem`, and the Cancel Edit action into a single reusable `resetFormFields()` utility function to adhere to the DRY (Don't Repeat Yourself) principle[cite: 9].
- **Consistent Naming Conventions**: Standardized state and variable naming using Hungarian-style type prefixes (`str` for strings, `arr` for arrays, `num` for numbers, `obj` for objects) for clearer code readability[cite: 9].
- **Dependency Alignment**: Resolved React 19 peer dependency conflicts by synchronizing `react` and `react-dom` versions (`19.2.3`) for reliable cross-platform web bundling[cite: 2, 3].

---

## 📚 References (By Feature)

### Core Architecture, State & Lifecycle (CRUD & Auto-Dismiss Banners)
- React Team. (2026). *useState – React Reference (Managing Form, Menu Array, and Filter States)*. Available at: https://react.dev/reference/react/useState
- React Team. (2026). *useEffect – React Reference (Auto-Dismissing Feedback Banner Timer)*. Available at: https://react.dev/reference/react/useEffect
- Microsoft. (2026). *TypeScript Handbook: Interfaces and Functional Components (`MenuItem` & `MenuItemCard`)*. Available at: https://www.typescriptlang.org/docs/

### Search, Filter & Statistics Calculations
- MDN Web Docs. (2026). *Array.prototype.filter() – JavaScript Reference (Dynamic Course & Search Filtering)*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- MDN Web Docs. (2026). *Array.prototype.reduce() – JavaScript Reference (Average Menu Price Calculation)*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
- MDN Web Docs. (2026). *String.prototype.toLowerCase() & includes() – JavaScript Reference (Case-Insensitive Dish Search)*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes

### User Interface, Forms & List Rendering
- Meta Platforms, Inc. (2026). *FlatList – React Native Core Components (Rendering Filtered Menu Cards)*. Available at: https://reactnative.dev/docs/flatlist
- Meta Platforms, Inc. (2026). *TextInput, TouchableOpacity & KeyboardAvoidingView – React Native Core Components*. Available at: https://reactnative.dev/docs/components-and-apis
- React Native Community. (2026). *@react-native-picker/picker Documentation (Course Category Selection & Filter Dropdowns)*. Available at: https://github.com/react-native-picker/picker

### Cross-Platform Bundling & Environment Setup
- Expo Documentation. (2026). *Expo SDK & Metro Bundler Setup (`npx expo start`)*. Available at: https://docs.expo.dev/
- Nicolas Gallagher. (2026). *React Native for Web Documentation (`react-native-web` & `react-dom` Compatibility)*. Available at: https://necolas.github.io/react-native-web/# MASTPOE
