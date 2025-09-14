import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  SafeAreaView 
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

// This would normally be stored in AsyncStorage or a database
// For demo purposes, we're using mock data
const mockHistoryData = [
  { id: '1', type: 'generated', content: 'https://example.com', date: '2023-10-15 14:30' },
  { id: '2', type: 'scanned', content: 'Product: ABC123', date: '2023-10-14 09:45' },
  { id: '3', type: 'generated', content: 'Contact: John Doe, john@example.com', date: '2023-10-13 16:20' },
  { id: '4', type: 'scanned', content: 'https://another-example.com', date: '2023-10-12 11:10' },
];

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState(mockHistoryData);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'generated', 'scanned'

  const filteredData = activeTab === 'all' 
    ? historyData 
    : historyData.filter(item => item.type === activeTab);

  const handleCopyToClipboard = async (content: string) => {
    try {
      await Clipboard.setStringAsync(content);
      Alert.alert('Copied', 'Content copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
      console.error('Clipboard error:', error);
    }
  };

  const handleDeleteItem = (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item from history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setHistoryData(historyData.filter(item => item.id !== id));
          }
        },
      ]
    );
  };

  const renderHistoryItem = ({ item }: { item: typeof mockHistoryData[0] }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyItemHeader}>
        <View 
          style={[styles.badge, item.type === 'generated' ? styles.generatedBadge : styles.scannedBadge]}
        >
          <Text style={styles.badgeText}>
            {item.type === 'generated' ? 'Generated' : 'Scanned'}
          </Text>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      
      <Text style={styles.contentText} numberOfLines={2}>{item.content}</Text>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleCopyToClipboard(item.content)}
        >
          <Text style={styles.actionButtonText}>Copy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => handleDeleteItem(item.id)}
        >
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>History</Text>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'generated' && styles.activeTab]}
          onPress={() => setActiveTab('generated')}
        >
          <Text style={[styles.tabText, activeTab === 'generated' && styles.activeTabText]}>Generated</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'scanned' && styles.activeTab]}
          onPress={() => setActiveTab('scanned')}
        >
          <Text style={[styles.tabText, activeTab === 'scanned' && styles.activeTabText]}>Scanned</Text>
        </TouchableOpacity>
      </View>
      
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderHistoryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No history items found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 15,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#ecf0f1',
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#3498db',
  },
  tabText: {
    fontWeight: '600',
    color: '#7f8c8d',
  },
  activeTabText: {
    color: 'white',
  },
  listContent: {
    padding: 15,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  generatedBadge: {
    backgroundColor: '#e8f4fd',
  },
  scannedBadge: {
    backgroundColor: '#e8f8f3',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#95a5a6',
    fontSize: 12,
  },
  contentText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: '#3498db',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  deleteButtonText: {
    color: '#e74c3c',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
  },
});

export default HistoryScreen;