import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import React, {Component} from 'react';
//@ts-ignore
import PLUS from '../images/PLUS.png';
//@ts-ignore
import Context from '../context/Context';
//@ts-ignore
import delete1 from '../images/delete.png';
//@ts-ignore
import edit from '../images/edit1.png';
//@ts-ignore
import imag from '../images/flower.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Istate {
  name: string;
  last: string;
  mobile: number;
  email: string;
  password: string;
  data: any;
  image: string;
  modalVisible: boolean;
  isSubimt: boolean;
  idEdit: string,
}

class Home extends Component<Istate> {
  state = {
    modalVisible: false,
    name: '',
    last: '',
    mobile: '',
    email: '',
    password: '',
    image: '',
    idEdit: '',
    isSubimt: true,
  };

  onName = (text: string) => {
    this.setState({name: text});
  };
  onLast = (text1: string) => {
    this.setState({last: text1});
  };
  onMobile = (text: string) => {
    this.setState({mobile: text});
  };
  onEmail = (text: string) => {
    this.setState({email: text});
  };
  onPassword = (text: string) => {
    this.setState({password: text});
  };

  selectImage = () => {
    const options = {
      title: 'select',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('user c');
      } else if (response.errorCode) {
        console.log('error', response.errorCode);
      } else {
        this.setState({image: response.assets[0].uri});
      }
    });
  };
  render() {
    return (
      <Context.Consumer>
        {value => {
          const onEdit = (id: any) => {
            const filtered = value.array.filter((each: {id:string}) => each.id === id);
            const editObj: any = filtered[0];
            this.setState({
              idEdit: editObj.id,
              name: editObj.name,
              last: editObj.last,
              mobile: editObj.mobile,
              email: editObj.email,
              password: editObj.password,
              image: editObj.image,
              isSubimt: false,
              modalVisible: true,
            });
          };
          return (
            <View style={style.container}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 28,
                    marginTop: 8,
                  }}>
                  Add User{' '}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      modalVisible: true,
                      name: '',
                      last: '',
                      mobile: '',
                      email: '',
                      password: '',
                      image: '',
                      isSubimt: true,
                    })
                  }>
                  <Image
                    style={{borderRadius: 25, height: 50, width: 50}}
                    source={PLUS}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                data={value.array}
                renderItem={({item}: {item: {id:string,image:string,name:string
                email:string,mobile:number}}) => (
                  <View style={style.card}>
                    <Image
                      style={style.photo}
                      source={{uri: `${item.image}`}}
                    />
                    <View>
                      <Text style={{color: 'white', marginTop: 12}}>
                        Name : {item.name}
                      </Text>
                      <Text style={{color: 'white', marginTop: 12}}>
                        Mobile : {item.mobile}
                      </Text>
                      <Text style={{color: 'white', marginTop: 12}}>
                        Email : {item.email}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          onEdit(item.id);
                        }}>
                        <Image style={{marginBottom: 30}} source={edit} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          value.onDelete(item.id);
                        }}>
                        <Image style={{marginTop: 24}} source={delete1} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
              <Modal
                visible={this.state.modalVisible}
                animationType="slide"
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  this.setState({
                    modalVisible: !this.state.modalVisible,
                    isSubimt: true,
                  });
                }}>
                <View style={style.container}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 28,
                      marginTop: 8,
                      marginLeft: 95,
                    }}>
                    User Details
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      style={style.input}
                      value={this.state.name}
                      placeholder="First Name "
                      onChangeText={this.onName}
                    />
                    <TextInput
                      style={style.input}
                      value={this.state.last}
                      placeholder="Last Name "
                      onChangeText={this.onLast}
                    />
                  </View>
                  <TextInput
                    style={style.input1}
                    value={this.state.mobile}
                    placeholder="Mobile num "
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={this.onMobile}
                  />
                  <TextInput
                    style={style.input1}
                    value={this.state.email}
                    placeholder="E-mail"
                    onChangeText={this.onEmail}
                    keyboardType="email-address"
                  />

                  <TextInput
                    style={style.input1}
                    value={this.state.password}
                    placeholder="Password"
                    onChangeText={this.onPassword}
                    keyboardType="visible-password"
                  />

                  <TouchableOpacity onPress={this.selectImage}>
                    <Text
                      style={{
                        height: 25,
                        padding: 4,
                        textAlign: 'center',
                        width: 80,
                        backgroundColor: '#8fbc8f',
                        marginLeft: 150,
                        marginTop: 20,
                      }}>
                      Choose image
                    </Text>
                  </TouchableOpacity>
                  {this.state.isSubimt ? (
                    <TouchableOpacity
                      onPress={() => {
                        const obj = {
                          id: value.array.length,
                          name: this.state.name,
                          last: this.state.last,
                          mobile: this.state.mobile,
                          email: this.state.email,
                          password: this.state.password,
                          image: this.state.image,
                        };

                        value.onAdd(obj);
                      }}>
                      <Text
                        style={{
                          height: 25,
                          padding: 4,
                          textAlign: 'center',
                          width: 80,
                          backgroundColor: '#8fbc8f',
                          marginLeft: 150,
                          marginTop: 20,
                        }}>
                        Submit
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        const obj = {
                          id: this.state.idEdit,
                          name: this.state.name,
                          last: this.state.last,
                          mobile: this.state.mobile,
                          email: this.state.email,
                          password: this.state.password,
                          image: this.state.image,
                        };

                        value.onAdd(obj);
                      }}>
                      <Text
                        style={{
                          height: 25,
                          padding: 4,
                          textAlign: 'center',
                          width: 80,
                          backgroundColor: '#8fbc8f',
                          marginLeft: 150,
                          marginTop: 20,
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Modal>
            </View>
          );
        }}
      </Context.Consumer>
    );
  }
}
const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: '100%',
  },
  input: {
    height: 40,
    margin: 12, //@ts-ignore
    borderWidth: 1,
    padding: 10,
    width: '40%',
  },
  input1: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  card: {
    height: 160,
    width: '95%',
    backgroundColor: '#5f9ea0',
    margin: 8,
    marginTop: 10,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photo: {
    height: 130,
    width: 100,
  },
});
export default Home;
