import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';
import { TfImageRecognition } from 'react-native-tensorflow';


const { width , height} = Dimensions.get('window');

export default class Home extends Component{

    constructor() {
        super();
        this.image = require('../../assets/dumbbell.jpg');
        this.state = {result: ''}
    }

    componentDidMount() {
        this.recognizeImage()
    }

    async recognizeImage() {

        try {
            const tfImageRecognition = new TfImageRecognition({
                model:require('../../assets/tensorflow_inception_graph.pb'),
                labels: require('../../assets/tensorflow_labels.txt')
            });

            const results = await tfImageRecognition.recognize({
                image: this.image
            });

            const resultText = `Name: ${results[0].name}\nConfidence: ${results[0].confidence.toFixed(2)}`
            this.setState({result: resultText});
            await tfImageRecognition.close()
        } catch(err) {
            alert(err)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={this.image} style={styles.image} />
                    <Text style={styles.result}>
                        {this.state.result}
                    </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    result: {
        fontSize:16,
        padding:5,
        textAlign: 'center',
        color: '#333333',
    },
    image: {
        width: 400,
        height: 300,
    },
});
