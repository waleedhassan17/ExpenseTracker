import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { GlobalStyles } from '../../constants/style';
import { ScrollView } from 'react-native-web';
function Input({ label, textInputConfig }) {
    return(
        <View style={styles.inputcontainer}>
            <ScrollView >
                 <Text style={styles.label}>{label}</Text>
                <TextInput style={styles.input} {...textInputConfig}/>
            </ScrollView>
           
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({

    inputcontainer: {
        marginHorizontal: 8,
        marginVertical: 16,

    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4

    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18

    },
});