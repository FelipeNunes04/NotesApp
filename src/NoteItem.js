import React, { Component } from 'react';
import { View,Button, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { selectNote } from './actions';

class NoteItem extends Component {

    
    onNotePress() {
        const { note } = this.props;
        Actions.noteEdit({ note: note });
    }

     
    render() {  
        const { note, pressed } = this.props;
        const { id, title, lastEdit } = note;
     
        return (
                <TouchableHighlight onPress={this.onNotePress.bind(this)} >     
                    <View style={{marginTop: 10}}>
                        <Text style={{ fontSize: 22}}>{title}</Text>
                        <Text style={{ fontSize: 12}}>Editada em: {lastEdit}</Text>
                    </View>
                </TouchableHighlight>
        )
    };
};

const mapStateToProps = (state, ownProps) => {
   const pressed = state.selectedNote.id === ownProps.note.id;
 
   return { pressed };
};

export default connect(mapStateToProps, { selectNote })(NoteItem);

