import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function MyRequestsScreen() {
  const requests = [
    {
      id: 'APP-00892',
      service: 'Community Certificate',
      dept: 'Revenue & Disaster Management',
      date: '2026-10-24',
      status: 'APPROVED',
      color: '#15803D',
      bg: '#DCFCE7',
      stage: 'Certificate Issued & Digitally Signed'
    },
    {
      id: 'APP-00914',
      service: 'Income Certificate',
      dept: 'Revenue & Disaster Management',
      date: '2026-10-29',
      status: 'UNDER_REVIEW',
      color: '#B45309',
      bg: '#FEF3C7',
      stage: 'Field Verification Scheduled with VAO'
    },
    {
      id: 'GRV-2026-10492',
      service: 'Grievance: Service Delay',
      dept: 'Revenue Administration',
      date: '2026-10-20',
      status: 'IN_PROGRESS',
      color: '#6D28D9',
      bg: '#EDE9FE',
      stage: 'Assigned to Deputy Tahsildar Madurai North'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Applications & Grievances</Text>
        <Text style={styles.headerSubtitle}>Real-time statutory tracking with SLA timer</Text>
      </View>

      <View style={styles.list}>
        {requests.map(req => (
          <View key={req.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.appNo}>{req.id}</Text>
              <View style={[styles.badge, { backgroundColor: req.bg }]}>
                <Text style={[styles.badgeText, { color: req.color }]}>{req.status}</Text>
              </View>
            </View>
            <Text style={styles.serviceName}>{req.service}</Text>
            <Text style={styles.dept}>{req.dept}</Text>
            
            <View style={styles.progressBox}>
              <Text style={styles.stageLabel}>Current Milestone:</Text>
              <Text style={styles.stageText}>{req.stage}</Text>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.date}>Submitted: {req.date}</Text>
              <TouchableOpacity style={styles.trackBtn}>
                <Text style={styles.trackBtnText}>View Full Timeline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  headerSubtitle: { fontSize: 12, color: '#64748B', marginTop: 2 },
  list: { padding: 14 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  appNo: { fontSize: 13, fontWeight: 'bold', color: '#6D28D9' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  serviceName: { fontSize: 15, fontWeight: 'bold', color: '#0F172A', marginTop: 6 },
  dept: { fontSize: 11, color: '#64748B', marginTop: 2 },
  progressBox: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8, marginTop: 10 },
  stageLabel: { fontSize: 10, color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' },
  stageText: { fontSize: 12, fontWeight: '600', color: '#1E293B', marginTop: 2 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  date: { fontSize: 11, color: '#94A3B8' },
  trackBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1' },
  trackBtnText: { fontSize: 11, color: '#334155', fontWeight: '600' }
});
