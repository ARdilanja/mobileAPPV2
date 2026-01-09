import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import Header from '../components/Header';
import { Fonts } from '../constants/fonts';
import axios from 'axios';
import { API_BASE } from '../config/api';

const { width } = Dimensions.get('window');
const scale = width / 390;

/* ICONS */
const billIcon = require('../assets/images/IP_Bill_summary.png');
const paymentIcon = require('../assets/images/IP_Payment_method.png');
const calendarIcon = require('../assets/images/IP_Payment_date.png');
const successIcon = require('../assets/images/IP_Payment_success.png');
const failedIcon = require('../assets/images/IP_Payment_failure.png');

export default function InvoicePreviewScreen({
    route,
}) {
    const {
        status = 'success',
        planAmount = 0,
        tax = 0,
        grandTotal = 0,
        transactionId,
        amountPaid = 0,
        dateTime = 'N/A',
    } = route?.params || {};


    const [invoice, setInvoice] = useState(null);
    console.log('invoice', invoice)
    const paymentStatus = invoice?.status?.toLowerCase()?.trim();
    console.log('paymentStatus', paymentStatus)
    const isSuccess = paymentStatus === 'success';

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE}/stripe/payment/${transactionId}`
                );
                console.log('res', res)
                setInvoice(res.data.data);
            } catch (error) {
                console.log("Invoice fetch failed");
            }
        };

        if (transactionId) {
            fetchInvoice();
        }
    }, [transactionId]);

    return (
        <View style={styles.container}>
            <Header title="Invoice preview" />

            {/* ============ BILL SUMMARY CARD ============ */}
            <View style={styles.card}>

                {/* Header */}
                <View style={styles.cardHeader}>
                    <Image source={billIcon} style={styles.billIcon} />
                    <Text style={styles.cardTitle}>Bill summary</Text>
                </View>

                {/* Divider after header */}
                <Divider />

                <Row label="Pro plan" value={`₹ ${invoice?.amount || 0}`} />
                <Row label="Tax" value={`₹ 0`} />


                {/* Divider after Tax */}
                <Divider />

                <Row
                    label="Grand total"
                    value={`₹ ${invoice?.amount || 0}`}
                    labelStyle={{ fontFamily: Fonts.SemiBold }}
                    valueStyle={{ fontFamily: Fonts.SemiBold }}
                />

                <Row
                    label="Coupon applied"
                    value="₹ 200"
                    labelStyle={{ color: '#235DFF' }}
                    valueStyle={{ color: '#235DFF' }}
                />

                {/* Divider after Coupon */}
                <Divider />

                <Row
                    label="Paid"
                    value={`₹ ${invoice?.amount || 0}`}
                    labelStyle={{ fontFamily: Fonts.SemiBold }}
                    valueStyle={{ fontFamily: Fonts.SemiBold }}
                />

                {/* Save bar */}
                <View style={styles.saveBar}>
                    <Text style={styles.saveText}>You save ₹200 🥳</Text>
                </View>
            </View>

            {/* ============ PAYMENT DETAILS CARD ============ */}
            <View style={styles.card}>

                {/* Payment Method */}
                <View style={styles.infoRow}>
                    <Image source={paymentIcon} style={styles.smallIcon} />
                    <View style={styles.infoText}>
                        <Text style={styles.infoLabel}>Payment method</Text>
                        <View style={styles.methodRow}>
                            <Text style={styles.infoValue}>Paid via:</Text>

                            <Text style={styles.methodValue}>
                                {invoice?.paymentMethod || '—'}
                            </Text>

                            <Image
                                source={isSuccess ? successIcon : failedIcon}
                                style={styles.statusIcon}
                            />
                        </View>


                    </View>
                </View>

                <Divider />

                {/* Payment Date */}
                <View style={styles.infoRow}>
                    <Image source={calendarIcon} style={styles.smallIcon} />
                    <View style={styles.infoText}>
                        <Text style={styles.infoLabel}>Payment date</Text>
                        <Text style={styles.infoValue}>
                            {invoice?.paidAt
                                ? new Date(invoice.paidAt).toLocaleString()
                                : 'N/A'}
                        </Text>

                    </View>
                </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Download invoice</Text>
            </TouchableOpacity>
        </View>
    );
}

/* ---------- SMALL COMPONENTS ---------- */

const Row = ({ label, value, labelStyle, valueStyle }) => (
    <View style={styles.row}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
);

const Divider = () => <View style={styles.divider} />;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },

    card: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 8,
    },

    billIcon: {
        width: 16,
        height: 16,
    },

    cardTitle: {
        fontSize: 18 * scale,
        fontFamily: Fonts.Medium,
        fontWeight: 500,
        color: "#000000"
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 11,
    },

    label: {
        fontSize: 14 * scale,
        color: '#2A2A2A',
        fontFamily: Fonts.Regular,
        fontWeight: 400
    },

    value: {
        fontSize: 14 * scale,
        color: '#2A2A2A',
        fontFamily: Fonts.Regular,
        fontWeight: 400
    },

    divider: {
        height: 1,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 16,
    },

    saveBar: {
        backgroundColor: '#DAEBFF',
        paddingVertical: 8,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#BFDBFE',
    },

    saveText: {
        fontSize: 12 * scale,
        color: '#235DFF',
        fontFamily: Fonts.Regular,
        fontWeight: 400
    },

    infoRow: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },

    smallIcon: {
        width: 12,
        height: 12,
        marginTop: 4,
    },

    infoText: {
        flex: 1,
    },

    infoLabel: {
        fontSize: 14 * scale,
        color: '#2A2A2A',
        fontFamily: Fonts.Regular,
        fontWeight: 400
    },

    infoValue: {
        fontSize: 14 * scale,
        fontFamily: Fonts.Medium,
        fontWeight: 500,
        marginTop: 8,
    },

    methodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    methodValue: {
        fontSize: 14 * scale,
        fontFamily: Fonts.SemiBold,   // bold
        color: '#111827',
        marginTop: 8
    },
    statusIcon: {
        width: 16,
        height: 16,
        marginTop: 8
    },

    button: {
        height: 56,
        backgroundColor: '#235DFF',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
        marginTop: 'auto',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 18 * scale,
        fontFamily: Fonts.Medium,
        fontWeight: 500
    },
});
