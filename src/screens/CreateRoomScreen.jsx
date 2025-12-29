import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

function generateSimpleId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 8; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

export default function CreateRoomScreen({ navigation }) {
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        setRoomName(generateSimpleId());
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Interview Code</Text>
            <Text style={styles.code}>{roomName}</Text>

            <Pressable
                style={styles.btn}
                onPress={() =>
                    navigation.replace("MicCheckScreen", {
                        roomName,
                        // for sme
                        interviewId: "67ee0d4febee98e48a182378",
                        cid: "67ee0d4febee98e48a182376",
                        // interviewId: "67ece15eedd3f67bc790bb00",
                        // cid: "67ece15dedd3f67bc790baf6",
                    })
                }
            >
                <Text style={styles.btnText}>Continue</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    label: { fontSize: 16, marginBottom: 8 },
    code: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    btn: {
        backgroundColor: "#1E6CFF",
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 8,
    },
    btnText: { color: "#fff", fontSize: 16 },
});
