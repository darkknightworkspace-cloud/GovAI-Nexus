# GovAI Nexus – Known Limitations & Future Roadmap
**System Boundaries, Pending Integrations & Technical Debt Tracking**

---

## 1. External Integration Boundaries

1. **TNeGA e-District Production VPN Gateway**:
   - The connector interface is fully implemented and tested with mock-free resilience protocols, but live end-to-end handshake requires dedicated MPLS/VPN tunnel credentials issued during physical TNSDC network staging.
2. **SBI ePay Live Merchant ID**:
   - Payment gateway verification uses test HMAC checksum keys until production merchant settlement accounts are provisioned by the Finance Department.
3. **DigiLocker Production OAuth2 Approval**:
   - DigiLocker Push/Pull schemas are verified; production API keys require formal MeitY departmental onboarding sign-off.

---

## 2. Technical Boundaries & Sizing

1. **Document Upload File Sizing**:
   - Single document uploads are capped at 15 MB to balance network bandwidth across rural taluk offices with high-throughput OCR extraction times.
2. **Tamil Speech Synthesis (TTS)**:
   - Voice synthesis delivers natural audio in Tamil and English; however, rural dialectical regionalisms (e.g. Kongu vs. Nellai slang) currently fall back to standard Chennai/Madurai administrative Tamil pronunciation.
3. **Mobile App Store Review**:
   - Android APK and iOS IPA build configurations are validated via EAS; store publishing requires final clearance from the Tamil Nadu Information Technology and Digital Services Department.

---

## 3. Future Roadmap (Phase 7 & Beyond)

- **Decentralized Verifiable Credentials (W3C Standard)**: Storing issued certificates on Tamil Nadu State Blockchain (TN-Block).
- **Edge AI OCR on Mobile**: On-device quantization of PaddleOCR models to enable instant offline certificate scanning without uploading image bytes to the cloud.
- **WhatsApp Bot Integration**: Official Tamil Nadu Government WhatsApp Business API channel powered by the 14-agent orchestrator.
