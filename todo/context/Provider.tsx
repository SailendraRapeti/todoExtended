import {Text, View} from 'react-native';
import React, {Component} from 'react';
import Context from './Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Iprops {
  children: any;
}
interface Istate {
  array: any;
 
}

class Providerr extends Component<Iprops, Istate> {
  state = {
    array: [],
    
  };
  
  componentDidMount(){
    this.getData()
  }

  getData = async () => {
    const getDetails: any = await AsyncStorage.getItem('userDetails');
    if (getDetails !== null){
      const getParsedData = JSON.parse(getDetails);
      this.setState({array:getParsedData})
    }
  }
  storeData = async () => {
    try {
      const details = JSON.stringify(this.state.array);
      

      await AsyncStorage.setItem('userDetails', details);
    } catch (e) {}
  };
  onAdd = (item: any) => {
  

    const {array} = this.state;
    console.log(array)
    let isValu = false;
   const editData =  array.map((each: any) => {
      if (each.id === item.id) {
        isValu = true;
        return item;
      }
      return each;
    });
    console.log('addCheck', isValu)
    if (isValu === false) {
      this.setState({array: [...array, item]}, () => {
        this.storeData();
      });
    } else {
      this.setState({array : editData});
      this.storeData();
    }
  };
  onDelete = async (id: any) => {
    console.log("delete",id);
    
    const {array} = this.state;
    const filterData: any = array.filter((each: any) => (
      each.id !== id
    ));
    // console.log("filter",filterData);
    
    this.setState({array: filterData});
    await AsyncStorage.setItem('userDetails', filterData);
  };





  // onEdit=(id:any)=>{
  //   const {array} = this.state;
  //   console.log(id);
  //   let isValu = false;
  //   array.map((each:any)=>{
     
  //       if (each.id === id) {
  //         isValu = true;
  //       }
  

  //   })
  //   if (isValu){
  //     console.log("123");
      
  //   }
    

  // }

//   }
  render() {
    const {array} = this.state;
    console.log(array);

    return (
      <Context.Provider
        value={{
          array: this.state.array,
          onAdd: this.onAdd,
          onDelete: this.onDelete,
       
       
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Providerr;
