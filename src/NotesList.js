import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchNotes } from './actions';
import NoteItem from './NoteItem';
import { Spinner } from './common/index';


class NotesList extends Component {
  
    componentDidMount() {
        this.props.fetchNotes();
    };
   
    _renderRow({ item }) {
        return <NoteItem note={ item }/>
    }

    _renderNotes() {

        if (this.props.loading) {
            return <Spinner size="large"/>
        } 
        if (this.props.notesAvailable) {
            return (
                <FlatList
                    data={this.props.dataSource}
                    renderItem={this._renderRow}
                />
            );
        }
        return (
            <View>
                <Text>Nenhuma Nota Adicionada ainda</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1, padding: 10}}>
                {this._renderNotes()}
            </View>
        );
    };
   
};


const mapStateToProps = state => {
    return {
        notesAvailable: state.note.notes.length,
        loading: state.note.loading,
        dataSource: state.note.notes
    };
};


export default connect(mapStateToProps, { fetchNotes })(NotesList);