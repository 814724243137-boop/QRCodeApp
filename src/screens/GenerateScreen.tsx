import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

const GenerateScreen = () => {
  const [qrValue, setQrValue] = useState('');
  const [qrType, setQrType] = useState('text');
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateQRCode = () => {
    if (!qrValue.trim()) {
      Alert.alert('Error', 'Please enter some content for the QR code');
      return;
    }
    setHasGenerated(true);
  };

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(qrValue);
      Alert.alert('Copied', 'Content copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
      console.error('Clipboard error:', error);
    }
  };

  const clearContent = () => {
    setQrValue('');
    setHasGenerated(false);
  };

  const renderQRTypeButtons = () => {
    const types = [
      { id: 'text', label: 'Text' },
      { id: 'url', label: 'URL' },
      { id: 'email', label: 'Email' },
      { id: 'phone', label: 'Phone' },
      { id: 'sms', label: 'SMS' },
    ];

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeContainer}>
        {types.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.typeButton, qrType === type.id && styles.selectedTypeButton]}
            onPress={() => setQrType(type.id)}
          >
            <Text style={[styles.typeButtonText, qrType === type.id && styles.selectedTypeButtonText]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const getPlaceholderText = () => {
    switch (qrType) {
      case 'url':
        return 'Enter URL (e.g., https://example.com)';
      case 'email':
        return 'Enter email address';
      case 'phone':
        return 'Enter phone number';
      case 'sms':
        return 'Enter phone number for SMS';
      default:
        return 'Enter text for QR code';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Generate QR Code</Text>
          
          {renderQRTypeButtons()}
          
          <TextInput
            style={styles.input}
            onChangeText={setQrValue}
            value={qrValue}
            placeholder={getPlaceholderText()}
            placeholderTextColor="#95a5a6"
            multiline={qrType === 'text'}
            keyboardType={qrType === 'phone' || qrType === 'sms' ? 'phone-pad' : 'default'}
            autoCapitalize="none"
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.generateButton} onPress={generateQRCode}>
              <Text style={styles.buttonText}>Generate QR Code</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.clearButton} onPress={clearContent}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          
          {hasGenerated && qrValue.trim() !== '' && (
            <View style={styles.qrContainer}>
              <QRCode
                value={qrValue}
                size={200}
                backgroundColor="white"
                color="black"
              />
              <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                <Text style={styles.copyButtonText}>Copy Content</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ecf0f1',
  },
  selectedTypeButton: {
    backgroundColor: '#3498db',
  },
  typeButtonText: {
    color: '#7f8c8d',
    fontWeight: '600',
  },
  selectedTypeButtonText: {
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
    minHeight: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  generateButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    flex: 0.7,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 15,
    flex: 0.25,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#7f8c8d',
    fontWeight: 'bold',
    fontSize: 16,
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  copyButton: {
    marginTop: 20,
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  copyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GenerateScreen;