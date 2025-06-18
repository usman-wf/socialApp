import { COLORS } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        backgroundColor: COLORS.primary,
    },
    backgroundGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get('window').height,
    },
    formContainer: {
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    errorText: {
        color: COLORS.danger,
    },
    successText: {
        color: COLORS.success,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    inputField: {
        height: 40,
        borderColor: COLORS.secondary,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    errorInput: {
        borderColor: COLORS.danger,
    },
    successInput: {
        borderColor: COLORS.success,
    },
    inputError: {
        borderColor: COLORS.danger,
    },
    inputSuccess: {
        borderColor: COLORS.success,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
});

