import React from 'react';
import { Text, View ,TouchableOpacity , StyleSheet , Image , TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'
// import { styleSheets } from 'min-document';

export default class ReadStoryscreen extends React.Component {
  constructor (){
    super()
    this.state={
      buttonStatus:'normal',
      hasCameraPermission:null,
      scanned:false,
      scannedBookId:'',
      scannedStudentId:'',
    }
  }

  getCameraPermissions=async(id)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)

    this.setState({
      buttonStatus:id,
      hasCameraPermissions: status ==='granted',
      scanned:false
    })
  }

  handleBarCodeScanned=async({type,data})=>{
    const {buttonState}=this.state

    if(buttonState==='StoryTitle'){
      this.setState({
        scanned:true,
        buttonStatus:'normal',
        scannedBookId:data
      })
    }
    else if(buttonState==='Author'){
      this.setState({
        scanned:true,
        buttonStatus:'normal',
        scannedStudentId:data
      })
    }
  }

  render() {
    const hasCameraPermissions=this.state.hasCameraPermissions
    const scanned=this.state.scanned
    const buttonStatus=this.state.buttonStatus

    if(buttonStatus!=='normal' && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarcodeScanned={scanned?undefined
            :this.handleBarCodeScanned
          }
          style={StyleSheet.absoluteFillObject}
        />
      )
    }
    else if(buttonStatus==='normal'){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={{textAlign:'center',fontSize:30}}> STORY HUB </Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputField}
              placeholder='StoryTitle'
              value={this.state.scannedBookId}
            />
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions('StoryTitle')
              }}
              >
              <Text 
                style={styles.buttonText}
              >
               SCAN
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputField}
              placeholder='Author'
              value={this.state.scannedStudentId}
            />
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions('Author')
              }}
              >
              <Text 
                style={styles.buttonText}
              >
                SCAN
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.Field}
              placeholder='Write Your Story Here'
              value={this.state.scannedStudentId}
            /> 
          </View>
          <TouchableOpacity 
              style={styles.scanedButton}
              onPress={()=>{
                this.getCameraPermissions('Write Your Story Here')
              }}
              >
              <Text 
                style={styles.buttonText}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles=StyleSheet.create({
  displayText:{
    fontSize:15,
    textDecorationLine:'underline',
  },
  buttonText:{
    fontSize:15,
  },
  scannedButton:{
    backgroundColor:'blue',
    padding:10,
    margin:10,
  },
  inputField:{
    width:150,
    height:40,
    borderWidth:1.5,
    fontSize:20
  },
   Field:{
    width:215,
    height:200,
    borderWidth:1.5,
    fontSize:20
  },
  scanButton:{
    backgroundColor: '#66BB6A',
    width: 50,
    borderWidth: 1.5, 
    borderLeftWidth: 0
  },
  scanedButton:{
    backgroundColor: 'lightblue',
    width: 70,
    borderWidth: 1.5, 
  },
  inputView:{
  flexDirection:'row',
  margin:15
  }
})