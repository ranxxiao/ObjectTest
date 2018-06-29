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
        this.image = require('../../assets/redfox.jpeg');
        this.state = {result: ''}
    }

    componentDidMount() {
        this.recognizeImage()
    }

    async recognizeImage() {

        try {
            const tfImageRecognition = new TfImageRecognition({
                model:require('../../assets/tensorflow_inception_graph.pb'),
                labels: require('../../assets/tensorflow_labels.txt'),
                imageMean: 100,
            });

            const results = await tfImageRecognition.recognize({
                image: this.image
            });

            results.forEach(result =>
            console.log(
               result.id,
               result.name,
               result.confidence,
            ));

            const resultText = `Name0: ${results[0].name}\nConfidence0: ${results[0].confidence.toFixed(2)}\n\nName1: ${results[1].name}\nConfidence1: ${results[1].confidence.toFixed(2)}\n\nName2: ${results[2].name}\nConfidence2: ${results[2].confidence.toFixed(2)}`
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
        width: 300,
        height: 200,
    },
});
