import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { getStoredUser } from '../utils/getUserDetails'
import PlanCard from '../components/PlanCard';
import { Fonts } from '../constants/fonts';
import Header from '../components/Header';
import { API_BASE } from '../config/api';

const { width } = Dimensions.get('window');

const scale = width / 390;
const PLAN_AMOUNT = 1000; // Pro plan
const TAX_AMOUNT = 180;
const GRAND_TOTAL = PLAN_AMOUNT + TAX_AMOUNT;
const PAID_AMOUNT = GRAND_TOTAL;

export default function PricingScreen() {
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [ready, setReady] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const [plans, setPlans] = useState([]);
  const [modules, setModules] = useState(null);
  const [loading, setLoading] = useState(true);


  const navigation = useNavigation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const fetchPaymentPlans = async () => {
    try {
      const res = await axios.get(`${API_BASE}/pricing/plans`);
      if (res.data.success) {
        setPlans(res.data.plans);
        setModules(res.data.modules);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load pricing plans");
    } finally {
      setLoading(false);
    }
  };


  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);

      fetchPaymentPlans();
    }, []),
  );

  /* ---------------- STRIPE INIT ---------------- */

  const initPayment = async () => {
    const user = await getStoredUser();

    const res = await axios.post(
      `${API_BASE}/stripe/create-payment-intent`,
      {
        email: user.email,
        userId: user._id,
      }
    );

    await initPaymentSheet({
      paymentIntentClientSecret: res.data.clientSecret,
      merchantDisplayName: "Confidence App",
    });

    return {
      transactionId: res.data.paymentIntentId,
      dateTime: new Date(res.data.createdAt * 1000).toLocaleString(),
    };
  };

  /* ================= UPDATE STATUS ================= */

  const updatePaymentStatus = async (transactionId, status) => {
    await axios.post(`${API_BASE}/stripe/create-payment-intent`, {
      transactionId,
      status,
    });
  };

  /* ================= PAY ================= */

  const handleUpgrade = async () => {
    try {
      const paymentData = await initPayment();

      const { error } = await presentPaymentSheet();

      if (error?.code === "Canceled") return;

      // ❌ FAILED
      if (error) {
        await updatePaymentStatus(paymentData.transactionId, "failed");

        navigation.navigate("PaymentStatusScreen", {
          status: "failed",
          transactionId: paymentData.transactionId,
          dateTime: paymentData.dateTime,
        });
        return;
      }

      // ✅ SUCCESS
      await updatePaymentStatus(paymentData.transactionId, "success");

      navigation.navigate("PaymentStatusScreen", {
        status: "success",
        transactionId: paymentData.transactionId,
        dateTime: paymentData.dateTime,
        planAmount: PLAN_AMOUNT,
        tax: TAX_AMOUNT,
        grandTotal: GRAND_TOTAL,
        amountPaid: PAID_AMOUNT,
      });

    } catch (e) {
      navigation.navigate("PaymentStatusScreen", {
        status: "failed",
        transactionId: "N/A",
        dateTime: new Date().toLocaleString(),
      });
    }
  };





  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Pricing" />

      <Text style={styles.heading}>Pick Your Confidence Plan</Text>
      <Text style={styles.textHead}>
        Why would you like to delete your account?
      </Text>

      {loading ? null : plans.map(plan => (
        <TouchableOpacity
          key={plan.planKey}
          activeOpacity={0.9}
          onPress={() => setSelectedPlan(plan.planKey)}
        >
          <PlanCard
            title={plan.name}
            price={`$${plan.price.usd}/yearly`}
            current={plan.planKey === "free"}
            active={selectedPlan === plan.planKey}
            features={plan.features}
          />
        </TouchableOpacity>
      ))}


      {/* UPGRADE BUTTON */}
      {selectedPlan === 'pro' && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpgrade}
        >
          <Text style={styles.buttonText}>Upgrade</Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40 * scale,
  },

  heading: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    marginLeft: 16 * scale,
    marginBottom: 16 * scale,
    lineHeight: 24,
  },

  textHead: {
    fontFamily: Fonts.Regular,
    marginLeft: 16 * scale,
    marginBottom: 16 * scale,
    lineHeight: 20,
  },

  button: {
    height: 56 * scale,
    width: 358 * scale,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24 * scale,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24,
  },
});