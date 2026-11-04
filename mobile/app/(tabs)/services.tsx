import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { mobileApi } from '../../services/mobileApi';

export default function ServicesScreen() {
  const [services, setServices] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    mobileApi.getServicesCatalog().then(setServices);
  }, []);

  const filtered = services.filter(s => 
    s.title?.toLowerCase().includes(search.toLowerCase()) || 
    s.title_ta?.includes(search)
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search 500+ TN Services & Certificates..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholderTextColor="#94A3B8"
        />
      </View>

      <ScrollView style={styles.list}>
        {filtered.map(srv => (
          <View key={srv.id} style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{srv.title}</Text>
              <Text style={styles.fee}>₹{srv.fee}</Text>
            </View>
            <Text style={styles.tamilTitle}>{srv.title_ta}</Text>
            <Text style={styles.dept}>{srv.dept}</Text>
            
            <View style={styles.slaBadge}>
              <Text style={styles.slaText}>Statutory SLA: {srv.sla_days} Days</Text>
            </View>

            <View style={styles.docsSection}>
              <Text style={styles.docsHeading}>Required Documents:</Text>
              {srv.docs_required?.map((doc: string, idx: number) => (
                <Text key={idx} style={styles.docItem}>• {doc}</Text>
              ))}
            </View>

            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Apply Online via e-Sevai</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  searchBox: { padding: 14, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  input: { backgroundColor: '#F1F5F9', borderRadius: 8, padding: 10, fontSize: 13, color: '#0F172A' },
  list: { padding: 14 },
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 15, fontWeight: 'bold', color: '#0F172A', flex: 1 },
  fee: { fontSize: 13, fontWeight: 'bold', color: '#6D28D9' },
  tamilTitle: { fontSize: 12, color: '#475569', marginTop: 2 },
  dept: { fontSize: 11, color: '#64748B', marginTop: 4 },
  slaBadge: { backgroundColor: '#EDE9FE', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: 8 },
  slaText: { color: '#6D28D9', fontSize: 10, fontWeight: 'bold' },
  docsSection: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  docsHeading: { fontSize: 11, fontWeight: 'bold', color: '#334155', marginBottom: 4 },
  docItem: { fontSize: 11, color: '#64748B', lineHeight: 16 },
  applyBtn: { backgroundColor: '#6D28D9', borderRadius: 8, paddingVertical: 8, alignItems: 'center', marginTop: 12 },
  applyBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }
});
