import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { paymentsAPI } from '../services/api';
import { logout } from '../utils/auth';
import colors from '../utils/colors';

interface PaymentStats {
  total: number;
  totalAmount: number;
  pending: number;
  completed: number;
  failed: number;
}

export default function DashboardScreen({ navigation }: any) {
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsData = await paymentsAPI.getPaymentStats();
      setStats(statsData);
    } catch (error: any) {
      console.error('Failed to load stats:', error);
      setError('Failed to load dashboard data. Please try again.');
      // Set default stats for demo purposes
      setStats({
        total: 0,
        totalAmount: 0,
        pending: 0,
        completed: 0,
        failed: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Even if logout fails, still redirect to login
      navigation.replace('Login');
    }
  };

  const handleRefresh = () => {
    loadStats();
  };

  if (loading) {
    return (
      <View style= { styles.loadingContainer } >
      <ActivityIndicator size="large" color = { colors.primary } />
        <Text style={ styles.loadingText }> Loading dashboard...</Text>
          </View>
    );
  }

  return (
    <ScrollView style= { styles.container } >
    <View style={ styles.header }>
      <Text style={ styles.title }> Payment Dashboard </Text>
  {
    error && (
      <Text style={ styles.errorText }> { error } </Text>
        )
  }
  </View>

    < View style = { styles.statsContainer } >
      <View style={ styles.statCard }>
        <Text style={ styles.statNumber }> { stats?.total || 0
} </Text>
  < Text style = { styles.statLabel } > Total Payments </Text>
    </View>

    < View style = { styles.statCard } >
      <Text style={ styles.statNumber }> ${ (stats?.totalAmount || 0).toFixed(2) } </Text>
        < Text style = { styles.statLabel } > Total Amount </Text>
          </View>

          < View style = { styles.statCard } >
            <Text style={ styles.statNumber }> { stats?.completed || 0}</Text>
              < Text style = { styles.statLabel } > Completed </Text>
                </View>

                < View style = { styles.statCard } >
                  <Text style={ styles.statNumber }> { stats?.pending || 0}</Text>
                    < Text style = { styles.statLabel } > Pending </Text>
                      </View>
                      </View>

                      < View style = { styles.buttonContainer } >
                        <TouchableOpacity 
                          style={ [styles.button, styles.primaryButton] }
onPress = {() => navigation.navigate('TransactionList')}
                        >
  <Text style={ styles.primaryButtonText }> View Transactions </Text>
    </TouchableOpacity>

    < TouchableOpacity
style = { [styles.button, styles.secondaryButton]}
onPress = {() => navigation.navigate('AddPayment')}
                        >
  <Text style={ styles.secondaryButtonText }> Add Payment </Text>
    </TouchableOpacity>

    < TouchableOpacity
style = { [styles.button, styles.successButton]}
onPress = { handleRefresh }
  >
  <Text style={ styles.successButtonText }> Refresh </Text>
    </TouchableOpacity>

    < TouchableOpacity
style = { [styles.button, styles.dangerButton]}
onPress = { handleLogout }
  >
  <Text style={ styles.dangerButtonText }> Logout </Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary
  },
  header: {
    marginBottom: 24
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: colors.textPrimary
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic'
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32
  },
  statCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '500'
  },
  buttonContainer: {
    marginTop: 16,
    gap: 12
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  primaryButton: {
    backgroundColor: colors.primary
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButton: {
    backgroundColor: colors.secondary
  },
  secondaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  successButton: {
    backgroundColor: colors.success
  },
  successButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  dangerButton: {
    backgroundColor: colors.error
  },
  dangerButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
}); 