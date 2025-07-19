import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from './utils/colors';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import TransactionListScreen from './screens/TransactionListScreen';
import TransactionDetailsScreen from './screens/TransactionDetailsScreen';
import AddPaymentScreen from './screens/AddPaymentScreen';

const Stack = createStackNavigator();

export default function AppLayout() {
  return (
    <Stack.Navigator 
      initialRouteName= "Login"
  screenOptions = {{
    headerStyle: {
      backgroundColor: colors.primary,
        },
    headerTintColor: colors.white,
      headerTitleStyle: {
      fontWeight: 'bold',
        fontSize: 18,
        },
  }
}
    >
  <Stack.Screen 
        name="Login"
component = { LoginScreen }
options = {{ headerShown: false }}
      />
  < Stack.Screen
name = "Register"
component = { RegisterScreen }
options = {{ headerShown: false }}
      />
  < Stack.Screen
name = "Dashboard"
component = { DashboardScreen }
options = {{
  title: 'Payment Dashboard',
    headerLeft: () => null,
        }}
      />
  < Stack.Screen
name = "TransactionList"
component = { TransactionListScreen }
options = {{ title: 'All Transactions' }}
      />
  < Stack.Screen
name = "TransactionDetails"
component = { TransactionDetailsScreen }
options = {{ title: 'Transaction Details' }}
      />
  < Stack.Screen
name = "AddPayment"
component = { AddPaymentScreen }
options = {{ title: 'New Payment' }}
      />
  </Stack.Navigator>
  );
}
