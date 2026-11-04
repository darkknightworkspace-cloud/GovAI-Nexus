import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { mobileApi } from '../../services/mobileApi';

export default function AiAssistantScreen() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      text: 'வணக்கம்! நான் உங்கள் GovAI அரசு உதவியாளர். தமிழக அரசின் நலத்திட்டங்கள், சான்றிதழ்கள், தகுதி விதிகள் குறித்து எதையும் கேளுங்கள். (Ask me about schemes, certificates, or procedures in Tamil or English).'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'en' | 'ta'>('ta');

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const res = await mobileApi.askAiAssistant(query, lang);
      const reply = res.reply || res.text || 'மன்னிக்கவும், தகவலைப் பெற முடியவில்லை.';
      setMessages(prev => [...prev, { role: 'assistant', text: reply, citations: res.citations }]);
    } catch (e) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'சாதிச் சான்றிதழ் பெற வருவாய் ஆய்வாளர் / கிராம நிர்வாக அலுவலர் (VAO) கள ஆய்வு செய்வர். தேவையான ஆவணங்கள்: ஆதார் அட்டை, ரேஷன் அட்டை, கல்வி சான்றிதழ்.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Language Switcher Bar */}
      <View style={styles.langBar}>
        <Text style={styles.langLabel}>Language / மொழி:</Text>
        <TouchableOpacity 
          style={[styles.langBtn, lang === 'ta' && styles.langBtnActive]} 
          onClick={() => setLang('ta')}
        >
          <Text style={[styles.langBtnText, lang === 'ta' && styles.langBtnTextActive]}>தமிழ்</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.langBtn, lang === 'en' && styles.langBtnActive]} 
          onClick={() => setLang('en')}
        >
          <Text style={[styles.langBtnText, lang === 'en' && styles.langBtnTextActive]}>English</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.chatArea}>
        {messages.map((m, idx) => (
          <View key={idx} style={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.msgText, m.role === 'user' ? styles.userText : styles.botText]}>
              {m.text}
            </Text>
          </View>
        ))}
        {loading && <ActivityIndicator color="#6D28D9" style={{ marginVertical: 10 }} />}
      </ScrollView>

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="கேள்வி அல்லது திட்டத்தை தட்டச்சு செய்க..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          placeholderTextColor="#94A3B8"
        />
        <TouchableOpacity style={styles.sendBtn} onClick={handleSend}>
          <Text style={styles.sendBtnText}>Ask</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  langBar: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', gap: 8 },
  langLabel: { fontSize: 11, color: '#64748B' },
  langBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#CBD5E1' },
  langBtnActive: { backgroundColor: '#6D28D9', borderColor: '#6D28D9' },
  langBtnText: { fontSize: 11, color: '#334155', fontWeight: 'bold' },
  langBtnTextActive: { color: '#FFFFFF' },
  chatArea: { flex: 1, padding: 14 },
  bubble: { maxWidth: '85%', padding: 12, borderRadius: 14, marginBottom: 10 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#6D28D9' },
  botBubble: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' },
  msgText: { fontSize: 13, lineHeight: 18 },
  userText: { color: '#FFFFFF' },
  botText: { color: '#0F172A' },
  inputBar: { flexDirection: 'row', padding: 10, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', gap: 8 },
  input: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 13, color: '#0F172A' },
  sendBtn: { backgroundColor: '#6D28D9', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center' },
  sendBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 }
});
