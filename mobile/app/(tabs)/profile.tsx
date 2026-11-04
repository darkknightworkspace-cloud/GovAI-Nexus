import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  const [smsConsent, setSmsConsent] = useState(true);
  const [pushConsent, setPushConsent] = useState(true);
  const [dataSharingConsent, setDataSharingConsent] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Citizen ID Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MA</Text>
        </View>
        <Text style={styles.name}>M. Anandhi</Text>
        <Text style={styles.meta}>Citizen ID: TN-CIT-2026-90412</Text>
        <Text style={styles.meta}>Madurai North, Madurai District</Text>
        
        <View style={styles.verifiedRow}>
          <Text style={styles.verifiedBadge}>✓ Aadhaar e-KYC Verified</Text>
          <Text style={styles.verifiedBadge}>✓ DigiLocker Linked</Text>
        </View>
      </View>

      {/* DPDP 2023 Consent & Privacy Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DPDP Act 2023 - Privacy & Consent</Text>
        
        <View style={styles.switchRow}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.switchTitle}>SMS & WhatsApp Status Alerts</Text>
            <Text style={styles.switchDesc}>Receive real-time statutory SLA updates on 9840XXXX12</Text>
          </View>
          <Switch value={smsConsent} onValueChange={setSmsConsent} />
        </View>

        <View style={styles.switchRow}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.switchTitle}>Push Notifications</Text>
            <Text style={styles.switchDesc}>Instant alerts for certificate approvals and hearings</Text>
          </View>
          <Switch value={pushConsent} onValueChange={setPushConsent} />
        </View>

        <View style={styles.switchRow}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.switchTitle}>Cross-Department Welfare Matching</Text>
            <Text style={styles.switchDesc}>Allow GovAI to auto-screen eligibility for unapplied welfare schemes</Text>
          </View>
          <Switch value={dataSharingConsent} onValueChange={setDataSharingConsent} />
        </View>
      </View>

      {/* Emergency Helpline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support & Helpline</Text>
        <View style={styles.card}>
          <Text style={styles.helplineText}>Chief Minister Helpline: 1100 (Toll Free)</Text>
          <Text style={styles.helplineSub}>Available 24/7 across Tamil Nadu in Tamil & English</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  profileCard: { backgroundColor: '#071B3B', padding: 24, alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#6D28D9', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  name: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  meta: { color: '#94A3B8', fontSize: 12, marginTop: 2 },
  verifiedRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  verifiedBadge: { backgroundColor: '#1E293B', color: '#10B981', fontSize: 11, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, fontWeight: '600' },
  section: { padding: 16 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#0F172A', marginBottom: 10, textTransform: 'uppercase' },
  switchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  switchTitle: { fontSize: 13, fontWeight: 'bold', color: '#1E293B' },
  switchDesc: { fontSize: 11, color: '#64748B', marginTop: 2 },
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  helplineText: { fontSize: 14, fontWeight: 'bold', color: '#6D28D9' },
  helplineSub: { fontSize: 11, color: '#64748B', marginTop: 2 }
});
