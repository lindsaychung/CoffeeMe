/**
 * Created by leonardean on 28/07/2017.
 */
import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import Tabs from './Tabs';

export default class SingleShop extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Tabs>
                    {/* First tab */}
                    <View title="WELCOME" style={styles.content}>

                    </View>
                    {/* Second tab */}
                    <View title="NATIVE" style={styles.content}>
                        <Text style={styles.header}>
                            Truly Native
                        </Text>
                        <Text style={styles.text}>
                            Components you define will end up rendering as native platform widgets
                        </Text>
                    </View>
                    {/* Third tab */}
                    <View title="EASY" style={styles.content}>
                        <Text style={styles.header}>
                            Ease of Learning
                        </Text>
                        <Text style={styles.text}>
                            It’s much easier to read and write comparing to native platform’s code
                        </Text>
                    </View>

                </Tabs>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    // App container
    container: {
        flex: 1,                            // Take up all screen
        backgroundColor: '#FFFFFF',         // Background color
    },
    // Tab content container
    content: {
        flex: 1,                            // Take up all available space
        justifyContent: 'center',           // Center vertically
        alignItems: 'center',               // Center horizontally
        backgroundColor: '#f0f0f0',         // Darker background for content area
    },
    // Content header
    header: {
        margin: 10,                         // Add margin
        color: '#000000',                   // White color
        fontFamily: 'Avenir',               // Change font family
        fontSize: 26,                       // Bigger font size
    },
    // Content text
    text: {
        marginHorizontal: 20,               // Add horizontal margin
        color: 'rgba(0, 0, 0, 0.75)', // Semi-transparent text
        textAlign: 'center',                // Center
        fontFamily: 'Avenir',
        fontSize: 18,
    }
});