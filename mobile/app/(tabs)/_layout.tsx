import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6D28D9',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#071B3B',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'GovAI Nexus - தமிழ்நாடு',
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          headerTitle: 'Government Services',
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI Assistant',
          headerTitle: 'Ask GovAI (தமிழ் / English)',
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'My Requests',
          headerTitle: 'Application Tracking',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'Citizen Profile & Consent',
        }}
      />
    </Tabs>
  );
}
