/**
 * GovAI Nexus Mobile - Push Notifications Service
 * Integrates Expo Notifications with the Python FastAPI backend
 * (/api/v1/mobile/device/register) for SLA reminders and application approvals.
 */
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const pushNotificationsService = {
  async registerForPushNotificationsAsync(apiBaseUrl: string, userId: string): Promise<string | null> {
    let token: string | null = null;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('govai_alerts', {
        name: 'GovAI Nexus Alerts',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#6D28D9',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.warn('Failed to obtain push notification permission for GovAI Nexus');
      return null;
    }

    try {
      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      token = pushTokenData.data;

      // Register device token with backend FastAPI server
      await fetch(`${apiBaseUrl}/mobile/device/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          device_token: token,
          platform: Platform.OS.toUpperCase(),
          app_version: '1.0.0'
        })
      });

      return token;
    } catch (error) {
      console.warn('Error obtaining push token:', error);
      return null;
    }
  }
};
