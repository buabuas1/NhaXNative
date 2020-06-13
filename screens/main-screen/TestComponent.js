// //This is an example of Pinch to Zoom Image//
// import React, { Component } from 'react';
// //import react in our code.
//
// import { StyleSheet, View, Modal } from 'react-native';
// //import all the components we are going to use.
//
// import ImageViewer from 'react-native-image-zoom-viewer';
// import Text from "react-native-web/dist/exports/Text";
// //import ImageViewer which will help to get zoom Image
//
// export default class ImageV extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isModelVisible: true,
//         };
//     }
//     ShowModalFunction(visible) {
//         this.setState({ isModelVisible: false });
//     }
//     render() {
//         const images = [{url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',},];
//         return (
//             <View style={styles.MainContainer}>
//                 <Modal
//                     visible={true}
//                     transparent={true}
//                     onRequestClose={() => this.ShowModalFunction()}>
//                     <ImageViewer style={styles.MainContainer} imageUrls={images} />
//                 </Modal>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     MainContainer: {
//         flex: 1,
//         alignItems: 'center',
//     },
// });