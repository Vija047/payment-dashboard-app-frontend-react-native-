import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';

type Props = {
  payment: {
    _id: string;
    amount: number;
    receiver: string;
    status: string;
    method: string;
    date: string;
  };
  onPress: () => void;
};

export default function TransactionCard({ payment, onPress }: Props) {
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

  return (
    <TouchableOpacity onPress= { onPress } style = { styles.card } >
      <View style={ styles.cardContent }>
        <View style={ styles.leftContent }>
          <View style={ styles.amountContainer }>
            <Text style={ styles.amount }> ${ payment.amount.toFixed(2) } </Text>
              < View style = { [styles.statusBadge, { backgroundColor: getStatusColor(payment.status) }]} >
                <Text style={ styles.statusText }> { payment.status.toUpperCase() } </Text>
                  </View>
                  </View>
                  < Text style = { styles.receiver } > To: { payment.receiver } </Text>
                    < View style = { styles.methodContainer } >
                      <Text style={ styles.methodIcon }> { getMethodIcon(payment.method) } </Text>
                        < Text style = { styles.method } > { payment.method } </Text>
                          </View>
                          </View>
                          < View style = { styles.rightContent } >
                            <Text style={ styles.date }> { new Date(payment.date).toLocaleDateString() } </Text>
                              < Text style = { styles.arrow } >→</Text>
                                </View>
                                </View>
                                </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: colors.white,
    marginVertical: 8,
    borderRadius: 16,
    elevation: 4,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftContent: {
    flex: 1
  },
  rightContent: {
    alignItems: 'flex-end'
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.textPrimary,
    marginRight: 12
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center'
  },
  statusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold'
  },
  receiver: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 8
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  methodIcon: {
    fontSize: 16,
    marginRight: 8
  },
  method: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500'
  },
  date: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500'
  },
  arrow: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold'
  }
}); 