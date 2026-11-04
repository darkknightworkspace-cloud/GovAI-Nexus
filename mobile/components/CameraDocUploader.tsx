import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

interface CameraDocUploaderProps {
  onDocumentCaptured: (docUri: string, docType: string) => void;
}

export const CameraDocUploader: React.FC<CameraDocUploaderProps> = ({ onDocumentCaptured }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const simulateCapture = async (docType: string) => {
    setIsScanning(true);
    setUploadStatus('Auto-aligning document edges & OCR scanning...');

    setTimeout(() => {
      setUploadStatus('Uploading securely to State Data Centre S3 Vault...');
      setTimeout(() => {
        setIsScanning(false);
        setUploadStatus('Document uploaded and SHA-256 hashed successfully!');
        onDocumentCaptured(`s3://tn-vault/docs/${docType.toLowerCase()}_sample.pdf`, docType);
      }, 1000);
    }, 1200);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Camera Document Scanner</Text>
      <Text style={styles.subtitle}>
        Capture physical certificates with auto-cropping, perspective correction, and OCR extraction.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.scanBtn}
          onClick={() => simulateCapture('Aadhaar Card')}
          disabled={isScanning}
        >
          <Text style={styles.scanBtnText}>Scan Aadhaar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.scanBtn}
          onClick={() => simulateCapture('Ration Card')}
          disabled={isScanning}
        >
          <Text style={styles.scanBtnText}>Scan Ration Card</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.scanBtn}
          onClick={() => simulateCapture('School TC')}
          disabled={isScanning}
        >
          <Text style={styles.scanBtnText}>Scan School TC</Text>
        </TouchableOpacity>
      </View>

      {isScanning && (
        <View style={styles.progressRow}>
          <ActivityIndicator color="#6D28D9" size="small" />
          <Text style={styles.statusText}>{uploadStatus}</Text>
        </View>
      )}

      {!isScanning && uploadStatus && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>✓ {uploadStatus}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 12 },
  title: { fontSize: 14, fontWeight: 'bold', color: '#0F172A' },
  subtitle: { fontSize: 11, color: '#64748B', marginTop: 2, marginBottom: 12 },
  buttonRow: { flexDirection: 'row', gap: 8 },
  scanBtn: { flex: 1, backgroundColor: '#071B3B', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  scanBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  statusText: { fontSize: 11, color: '#6D28D9', fontWeight: '500' },
  successBox: { backgroundColor: '#DCFCE7', padding: 8, borderRadius: 6, marginTop: 10 },
  successText: { color: '#15803D', fontSize: 11, fontWeight: '600' }
});
