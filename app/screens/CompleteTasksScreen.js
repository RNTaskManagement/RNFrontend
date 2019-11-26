import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Platform,
  StyleSheet,
  Image,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
  SafeAreaView,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';

import renderIf from '../utils/renderif';

const { width: WIDTH } = Dimensions.get('window');

const firebase = require('firebase');
var db;

const { height: HEIGHT } = Dimensions.get('window');

class HomeScreen extends Component {

  constructor(props) {
    super(props);

    db = firebase.firestore();

    this.state = {
      //put state item here
      data: [],
      userName: '',
      teamName: '',
      taskName: '',
      taskDetails: '',
      taskPriority: '',
      createTaskContainer: false,
    };

  }
  getTasks() {
    console.log('====================');
    let that = this;
    db.collection('completeTasks')
      .get()
      .then(function (querysnapshot) {
        //console.log(querySnapshot.docs[1].data());
        that.state.data = [];
        const docSnapshots = querysnapshot.docs;
        for (var i in docSnapshots) {
          var obj = {};
          if (!querysnapshot.empty) {
            const doc = docSnapshots[i].data();
            // obj['teamName'] = doc.teamName;
            obj['taskName'] = doc.taskName;
            obj['taskDetails'] = doc.taskDetails;
            obj['taskPriority'] = doc.taskPriority;
          }
          if (obj.taskName != undefined) {
            let tempData = that.state.data;
            tempData.push(obj);

            that.setState({ data: tempData }); //this.state.data.push(obj);
          }
          console.log(that.state.data);
          // Check for your document data here and break when you find it
        }
      });
  }

  createTasks() {
    let that = this;
    db.collection('completeTasks')
      .get()
      .then(function (querySnapshot) {
        db.collection('completeTasks')
          .add({
            taskName: that.state.taskName,
            taskDetails: that.state.taskDetails,
            taskPriority: that.state.taskPriority,
          })
          .then(result => {
            that.getTasks();
            that.setState({ createTaskContainer: false });
          });
      });
  }

  componentDidMount() {
    // this.createTasks();
    this.getTasks();

    console.log('*********', this.props.teamName)
    if (firebase.auth().currentUser)
      this.setState({ userName: firebase.auth().currentUser.displayName });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.setState({ createTaskContainer: true });
              }}>
              <Text style={styles.createTasksBtn}>Create Task</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {renderIf(this.state.createTaskContainer)(
              <ImageBackground style={styles.workContainer}>
                <Text style={styles.workAreaHeading}>Create new task</Text>
                <TextInput
                  style={styles.inputa}
                  placeholder={'Task Name'}
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={text => {
                    this.setState({ taskName: text });
                  }}
                />
                <TextInput
                  style={styles.inputa}
                  placeholder={'Task Details'}
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={text => {
                    this.setState({ taskDetails: text });
                  }}
                />
                <TextInput
                  style={styles.inputa}
                  placeholder={'Task Priority'}
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={text => {
                    this.setState({ taskPriority: text });
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.createTasks();
                  }}>
                  <Text style={styles.submitText}>Add Task</Text>
                </TouchableOpacity>
              </ImageBackground>,
            )}
          </View>
          <View>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <Item title={item} />}
            //keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

function Item({ title }) {
  console.log(title);
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>Task Name : {title.taskName}</Text>
        <Text style={styles.taskDescription}>
          Task Details : {title.taskDetails}
        </Text>
      </View>
      <View style={styles.taskPriorityView}>
        <View style={styles.taskPriorityText}>
          <Text style={styles.taskPriority}>Priority: </Text>
        </View>
        <View style={styles.taskPriorityVal}>
          <Text style={styles.taskPriority}>{title.taskPriority}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerName}>Create By : Vidul Sir</Text>
        <Text style={styles.footerTime}>Create At : Today</Text>
      </View>
    </View>
  );
}

// function getTasks() {
//   console.log('====================');
//   db.collection('completeTasks')
//     .get()
//     .then(function(querySnapshot) {
//       console.log(querySnapshot);
//     });
// }

function mapStateToProps(state) {
  return {
    //add mappers here
    teamName: state.Session.teamName
  };
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.9)'
  },
  item: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  createTasksBtn: {
    margin: 25,
    color: 'rgba(7, 243, 125, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskDescription: {
    fontSize: 16,
    color: 'rgba(7, 243, 125, 0.8)',
  },
  taskPriority: {
    fontSize: 16,
    color: 'white',
  },
  taskPriorityView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  taskPriorityVal: {
    padding: 5,
    color: '#fff',
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  workContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    height: 290,
    width: WIDTH - 65,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  workAreaHeading: {
    marginBottom: 20,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 22,
    textAlign: 'center',
  },
  inputa: {
    textAlign: 'center',
    borderRadius: 20,
    marginTop: 10,
    width: WIDTH - 100,
    height: 45,
    borderColor: 'white',
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
  },
  taskPriorityText: {
    padding: 5,
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  footerName: {
    color: 'white',
  },
  footerTime: {
    color: 'white',
  },
  submitText: {
    marginTop: 25,
    color: 'rgba(7, 243, 125, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
