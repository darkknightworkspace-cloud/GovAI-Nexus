import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { mobileApi } from '../../services/mobileApi';

export default function HomeScreen() {
  const [homeData, setHomeData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const data = await mobileApi.getHomeData('usr-citizen-01', 'en');
    setHomeData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <ScrollView 
      style={styles.container} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Hero Welcome Header */}
      <View style={styles.heroCard}>
        <View style={styles.badgeRow}>
          <View style={styles.stateBadge}>
            <Text style={styles.stateBadgeText}>GOVERNMENT OF TAMIL NADU</Text>
          </View>
          {homeData?.is_offline && (
            <View style={styles.offlineBadge}>
              <Text style={styles.offlineBadgeText}>OFFLINE</Text>
            </View>
          )}
        </View>

        <Text style={styles.heroTitle}>{homeData?.greeting || 'Welcome, Citizen'}</Text>
        <Text style={styles.heroSubtitle}>District: Madurai | Taluk: Madurai North</Text>
      </View>

      {/* Announcements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Important Announcements</Text>
        {homeData?.announcements?.map((ann: any) => (
          <View key={ann.id} style={styles.announcementCard}>
            <Text style={styles.announcementBadge}>{ann.badge}</Text>
            <Text style={styles.announcementTitle}>{ann.title}</Text>
            <Text style={styles.announcementDate}>{ann.date}</Text>
          </View>
        ))}
      </View>

      {/* Quick Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Services</Text>
        <View style={styles.grid}>
          {homeData?.quick_services?.map((srv: any) => (
            <TouchableOpacity key={srv.id} style={styles.gridTile}>
              <Text style={styles.tileTitle}>{srv.name}</Text>
              <Text style={styles.tileFee}>Fee: ₹{srv.fee}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Requests Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Requests ({homeData?.active_applications_count || 0})</Text>
        <View style={styles.requestCard}>
          <View style={styles.requestRow}>
            <Text style={styles.requestService}>Community Certificate</Text>
            <Text style={styles.statusApproved}>APPROVED</Text>
          </View>
          <Text style={styles.requestAppNo}>TN-REV-2026-00892</Text>
          <Text style={styles.requestDate}>Approved on 28 Oct 2026 by VAO Madurai North</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  heroCard: { backgroundColor: '#071B3B', padding: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stateBadge: { backgroundColor: '#F59E0B', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  stateBadgeText: { color: '#071B3B', fontSize: 10, fontWeight: 'bold' },
  offlineBadge: { backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  offlineBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' },
  heroTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  heroSubtitle: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  announcementCard: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  announcementBadge: { color: '#DC2626', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  announcementTitle: { fontSize: 14, fontWeight: '600', color: '#1E293B', marginTop: 2 },
  announcementDate: { fontSize: 11, color: '#64748B', marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridTile: { backgroundColor: '#FFFFFF', width: '48%', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  tileTitle: { fontSize: 13, fontWeight: 'bold', color: '#0F172A' },
  tileFee: { fontSize: 11, color: '#6D28D9', marginTop: 4, fontWeight: '600' },
  requestCard: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  requestRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  requestService: { fontSize: 14, fontWeight: 'bold', color: '#0F172A' },
  statusApproved: { backgroundColor: '#DCFCE7', color: '#15803D', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  requestAppNo: { fontSize: 12, color: '#64748B', marginTop: 2 },
  requestDate: { fontSize: 11, color: '#10B981', marginTop: 6 }
});
