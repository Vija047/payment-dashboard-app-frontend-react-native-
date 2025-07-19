import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { apiFetch } from '../services/api';
import colors from '../utils/colors';

export default function TransactionDetailsScreen({ route }: any) {
  const { id } = route.params;
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/payments/${id}`)
      .then(setPayment)
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return colors.success;
      case 'pending': return colors.warning;
      case 'failed': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'credit card': return '💳';
      case 'debit card': return '💳';
      case 'paypal': return '🅿️';
      case 'bank transfer': return '🏦';
      default: return '💰';
    }
  };

  if (loading) {
    return (
      <View style= { styles.loadingContainer } >
      <ActivityIndicator size="large" color = { colors.primary } />
        <Text style={ styles.loadingText }> Loading transaction details...</Text>
          </View>
    );
  }

  if (!payment) {
    return (
      <View style= { styles.errorContainer } >
      <Text style={ styles.errorText }> Transaction not found </Text>
        </View>
    );
  }

  return (
    <ScrollView style= { styles.container } >
    <View style={ styles.header }>
      <Text style={ styles.title }> Payment Details </Text>
        </View>

        < View style = { styles.card } >
          <View style={ styles.amountSection }>
            <Text style={ styles.amount }> ${ payment.amount.toFixed(2) } </Text>
              < View style = { [styles.statusBadge, { backgroundColor: getStatusColor(payment.status) }]} >
                <Text style={ styles.statusText }> { payment.status.toUpperCase() } </Text>
                  </View>
                  </View>
                  </View>

                  < View style = { styles.card } >
                    <View style={ styles.detailRow }>
                      <Text style={ styles.detailLabel }> To: </Text>
                        < Text style = { styles.detailValue } > { payment.receiver } </Text>
                          </View>

                          < View style = { styles.detailRow } >
                            <Text style={ styles.detailLabel }> Method: </Text>
                              < View style = { styles.methodContainer } >
                                <Text style={ styles.methodIcon }> { getMethodIcon(payment.method) } </Text>
                                  < Text style = { styles.detailValue } > { payment.method } </Text>
                                    </View>
                                    </View>

                                    < View style = { styles.detailRow } >
                                      <Text style={ styles.detailLabel }> Date: </Text>
                                        < Text style = { styles.detailValue } > { new Date(payment.date).toLocaleString() } </Text>
                                          </View>

  {
    payment.description && (
      <View style={ styles.detailRow }>
        <Text style={ styles.detailLabel }> Description: </Text>
          < Text style = { styles.detailValue } > { payment.description } </Text>
            </View>
        )
  }
  </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: 'center',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.white,
    margin: 16,
    marginTop: 8,
    padding: 20,
    borderRadius: 16,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  amountSection: {
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  detailLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
  },
  methodIcon: {
    fontSize: 20,
    marginRight: 8,
  },
}); 