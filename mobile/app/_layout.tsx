import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { pushNotificationsService } from '../services/pushNotifications';

export default function RootLayout() {
  useEffect(() => {
    // Initialize push notifications on launch
    pushNotificationsService.registerForPushNotificationsAsync(
      'http://10.0.2.2:8000/api/v1',
      'usr-citizen-01'
    ).catch(err => console.log('Notification registration init:', err));
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#071B3B" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#071B3B' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
