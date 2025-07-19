import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, TextInput, StyleSheet, RefreshControl } from 'react-native';
import { apiFetch } from '../services/api';
import TransactionCard from '../components/TransactionCard';
import colors from '../utils/colors';

export default function TransactionListScreen({ navigation }: any) {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({ status: '', method: '', dateFrom: '', dateTo: '' });

  const fetchPayments = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => v && params.append(k, v));
      const data = await apiFetch('/payments?' + params.toString());
      setPayments(data);
    } catch {
      setPayments([]);
    }
  };

  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true);
      await fetchPayments();
      setLoading(false);
    };
    loadPayments();
  }, [filters]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPayments();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style= { styles.loadingContainer } >
      <ActivityIndicator size="large" color = { colors.primary } />
        <Text style={ styles.loadingText }> Loading transactions...</Text>
          </View>
    );
  }

  return (
    <View style= { styles.container } >
    <Text style={ styles.title }> Transactions </Text>
      < View style = { styles.filtersContainer } >
        <TextInput 
          placeholder="Filter by status"
  value = { filters.status }
  onChangeText = { v => setFilters(f => ({ ...f, status: v }))
}
style = { styles.filterInput }
placeholderTextColor = { colors.textLight }
  />
  <TextInput 
          placeholder="Filter by method"
value = { filters.method }
onChangeText = { v => setFilters(f => ({ ...f, method: v }))}
style = { styles.filterInput }
placeholderTextColor = { colors.textLight }
  />
  </View>
  < FlatList
data = { payments }
keyExtractor = { item => item._id }
renderItem = {({ item }) => (
  <TransactionCard
            payment= { item }
onPress = {() => navigation.navigate('TransactionDetails', { id: item._id })}
          />
        )}
refreshControl = {
          < RefreshControl
refreshing = { refreshing }
onRefresh = { onRefresh }
colors = { [colors.primary]}
tintColor = { colors.primary }
  />
        }
showsVerticalScrollIndicator = { false}
contentContainerStyle = { styles.listContainer }
  />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 16,
    marginHorizontal: 16,
    color: colors.textPrimary,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginHorizontal: 16,
    gap: 12,
  },
  filterInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.white,
    color: colors.textPrimary,
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
}); 