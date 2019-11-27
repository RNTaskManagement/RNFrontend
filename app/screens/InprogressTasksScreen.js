import React, {Component} from 'react';
import {connect} from 'react-redux';

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
import CompleteTasks from './CompleteTasksScreen';
import OpenTasks from './OpenTasksScreen';

const {width: WIDTH} = Dimensions.get('window');

const firebase = require('firebase');
var db;

const {height: HEIGHT} = Dimensions.get('window');

import {NavigationEvents} from 'react-navigation';

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
      statusUpdate: 'inProgess',
      createTaskContainer: false,
      updateTaskStatus: false,
    };
  }
  getTasks() {
    let that = this;
    let props = this.props;
    db.collection('inProgessTasks')
      .where('teamName', '==', props.teamName)
      .get()
      .then(function(querysnapshot) {
        //console.log(querySnapshot.docs[1].data());
        that.state.data = [];
        const docSnapshots = querysnapshot.docs;
        for (var i in docSnapshots) {
          var obj = {};
          if (!querysnapshot.empty) {
            obj['taskId'] = docSnapshots[i].id;
            console.log('------' + obj['taskId']);
            const doc = docSnapshots[i].data();
            // obj['teamName'] = doc.teamName;
            obj['taskName'] = doc.taskName;
            obj['taskDetails'] = doc.taskDetails;
            obj['taskPriority'] = doc.taskPriority;
            obj['createdBy'] = doc.createdBy;
            obj['createdAt'] = doc.createdAt;
            obj['teamName'] = doc.teamName;
          }
          if (obj.taskName != undefined) {
            let tempData = that.state.data;
            tempData.push(obj);

            that.setState({data: tempData}); //this.state.data.push(obj);
          }
          console.log(that.state.data);
          // Check for your document data here and break when you find it
        }
      });
  }

  createTasks() {
    let that = this;
    let props = this.props;
    db.collection('inProgessTasks')
      .get()
      .then(function(querySnapshot) {
        var today = new Date();
        var date =
          today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        var time =
          today.getHours() +
          ':' +
          today.getMinutes() +
          ':' +
          today.getSeconds();
        db.collection('inProgessTasks')
          .add({
            taskName: that.state.taskName,
            taskDetails: that.state.taskDetails,
            taskPriority: that.state.taskPriority,
            teamName: props.teamName,
            createdBy: that.state.userName,
            createdAt: date + ' ' + time,
          })
          .then(result => {
            that.getTasks();
            that.setState({createTaskContainer: false});
          });
      });
  }

  componentDidMount() {
    // this.createTasks();
    this.getTasks();

    console.log('*********', this.props.teamName);
    if (firebase.auth().currentUser)
      this.setState({userName: firebase.auth().currentUser.displayName});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View>
            <NavigationEvents
              onWillFocus={() => {
                //Call whatever logic or dispatch redux actions and update the screen!
                this.getTasks();
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({createTaskContainer: true});
              }}>
              <Text style={styles.createTasksBtn}>Create Task</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {renderIf(this.state.createTaskContainer)(
              <ImageBackground style={styles.workContainer}>
                <Text style={styles.workAreaHeading}>Create new task</Text>
                <TextInput
                  style={styles.inputa}
                  placeholder={'Task Name'}
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={text => {
                    this.setState({taskName: text});
                  }}
                />
                <TextInput
                  style={styles.inputa}
                  placeholder={'Task Details'}
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={text => {
                    this.setState({taskDetails: text});
                  }}
                />
                <TextInput
                  style={styles.inputa}
                  placeholder={'Task Priority'}
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  onChangeText={text => {
                    this.setState({taskPriority: text});
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
              renderItem={({item}) => (
                <Item title={item} props={this.props} state={this} />
              )}
              //keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

function Item({title, props, state}) {
  let time = title.createdAt.split(' ')[1];
  let date = title.createdAt.split(' ')[0];

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
        <Text style={styles.footerName}>UserName : {title.createdBy}</Text>
        <Text style={styles.footerTime1}>Date : {date}</Text>
        <Text style={styles.footerTime2}>Time: {time}</Text>
      </View>
      <View style={{alignItems: 'center', alignContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            let taskDetails = {
              id: title.taskId,
              taskStatus: 'inProgess',
            };

            db.collection('inProgessTasks')
              .doc(title.taskId)
              .delete()
              .then(function() {
                db.collection('completeTasks')
                  .add(title)
                  .then(() => {
                    InProgressTasks.getTasks();
                  });
                state.setState({updateTaskStatus: false});
                state.getTasks();
              })
              .catch(function(error) {
                console.error('Error removing document: ', error);
              });

            props.updateTaskStatus(taskDetails);
          }}>
          <Text style={styles.moveBtn}>Complete</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', alignContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            let taskDetails = {
              id: title.taskId,
              taskStatus: 'Complete',
            };

            db.collection('inProgessTasks')
              .doc(title.taskId)
              .delete()
              .then(function() {
                db.collection('openTasks')
                  .add(title)
                  .then(() => {
                    InProgressTasks.getTasks();
                  });

                state.setState({updateTaskStatus: false});
                state.getTasks();
              })
              .catch(function(error) {
                console.error('Error removing document: ', error);
              });

            props.updateTaskStatus(taskDetails);
          }}>
          <Text style={styles.moveBtn}>Open</Text>
        </TouchableOpacity>
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
    teamName: state.Session.teamName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTaskStatus: taskDetails =>
      dispatch({type: 'UPDATE_TASK_STATUS', taskDetails}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.9)',
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
  moveBtn: {
    margin: 10,
    width: 100,
    color: 'rgba(7, 243, 125, 1)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  taskDescription: {
    fontSize: 16,
    color: 'rgba(7, 243, 125, 0.8)',
    marginTop: 10,
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
  footerTime1: {
    color: 'white',
  },
  footerTime2: {
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
