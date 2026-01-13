// ReminderModal.jsx
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Fonts } from '../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;
const ITEM_HEIGHT = 48;


const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, '0')
);
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, '0')
);
const ampmList = ['AM', 'PM'];

export default function ReminderModal({ visible, onClose, onConfirm }) {
  const [hour, setHour] = useState('10');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmPm] = useState('AM');

  const onScrollEnd = (list, setter) => (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    setter(list[index]);
  };

  const to24HourFormat = (hour, minute, ampm) => {
    let h = parseInt(hour, 10);

    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;

    return `${String(h).padStart(2, '0')}:${minute}`;
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>

          {/* Skip */}
          <Pressable style={styles.skip} onPress={onClose}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>

          {/* Drag bar */}
          <View style={styles.dragBar} />

          <Text style={styles.title}>Set a Daily Reminder</Text>
          <Text style={styles.subtitle}>
            Stay consistent and build confidence, just a few minutes a day.
          </Text>

          {/* Timer */}
          <View style={styles.timerWrapper}>
            <Text style={styles.timerTitle}>Choose Reminder Time</Text>

            <View style={styles.wheelContainer}>
              <View style={styles.centerHighlight} />

              <View style={styles.timerRow}>
                {/* HOURS */}
                <Wheel
                  data={hours}
                  selectedValue={hour}
                  onEnd={onScrollEnd(hours, setHour)}
                  visibleItems={3}
                />

                <Text style={styles.colon}>:</Text>

                {/* MINUTES */}
                <Wheel
                  data={minutes}
                  selectedValue={minute}
                  onEnd={onScrollEnd(minutes, setMinute)}
                  visibleItems={3}
                />

                {/* AM / PM */}
                <Wheel
                  data={ampmList}
                  selectedValue={ampm}
                  onEnd={onScrollEnd(ampmList, setAmPm)}
                  width={70}
                  visibleItems={3}
                />
              </View>
            </View>
          </View>

          {/* Button */}
          <Pressable
            style={styles.button}
            onPress={() => {
              const time24 = to24HourFormat(hour, minute, ampm);

              onConfirm?.({
                time: time24,                // "11:00"
                displayTime: `${hour}:${minute} ${ampm}` // optional
              });

              onClose();
            }}

          >
            <Text style={styles.buttonText}>Set reminder</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}

/* ================= WHEEL COMPONENT ================= */

function Wheel({
  data,
  onEnd,
  width = 90,
  visibleItems = 3,
  selectedValue,
}) {
  const scrollRef = useRef(null);
  const padding = ITEM_HEIGHT * Math.floor(visibleItems / 2);

  useEffect(() => {
    const index = data.indexOf(selectedValue);
    if (index !== -1 && scrollRef.current) {
      scrollRef.current.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, [selectedValue, data]);


  return (
    <ScrollView
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      onMomentumScrollEnd={onEnd}
      contentContainerStyle={{ paddingVertical: padding }}
      style={{
        width,
        height: ITEM_HEIGHT * visibleItems,
      }}
    >
      {data.map((item) => (
        <View key={item} style={styles.item}>
          <Text
            style={[
              styles.itemText,
              item === selectedValue && styles.activeItemText,
            ]}
          >
            {item}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },

  sheet: {
    height: 484,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
  },

  skip: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 10,
  },

  skipText: {
    fontFamily: Fonts.Regular,
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    color: '#235DFF',
  },

  dragBar: {
    width: 180 * scale,
    height: 8 * scale,
    backgroundColor: '#D9D9D9',
    borderRadius: 24 * scale,
    alignSelf: 'center',
    marginTop: 8 * scale,
    marginBottom: 24 * scale,
  },

  title: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24 * scale,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
    lineHeight: 20 * scale,
    textAlign: 'center',
    marginHorizontal: 25 * scale,
    marginTop: 8 * scale,
  },

  timerWrapper: {
    marginTop: 24 * scale,
  },

  timerTitle: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    // textAlign: 'center',
    marginBottom: 12 * scale,
  },

  wheelContainer: {
    height: ITEM_HEIGHT * 3,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  centerHighlight: {
    position: 'absolute',
    top: ITEM_HEIGHT,
    // left: 16,
    // right: 16,
    height: ITEM_HEIGHT,
    borderRadius: 8,
  },

  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 32 * scale,
    lineHeight: ITEM_HEIGHT,      // ✅ KEY FIX
    fontFamily: Fonts.Medium,
    // lineHeight: 48 * scale,
    color: '#666666',
    textAlignVertical: 'center',
  },

  activeItemText: {
    fontSize: 32 * scale,
    lineHeight: ITEM_HEIGHT,      // ✅ KEY FIX
    fontFamily: Fonts.Medium,
    // lineHeight: 48 * scale,
    color: "#000"           // ✅ emphasis without movement
  },


  colon: {
    fontSize: 24,
    marginHorizontal: 8,
  },

  button: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    height: 56,
    backgroundColor: 'rgba(35,93,255,1)',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: Fonts.Medium,
  },
});
