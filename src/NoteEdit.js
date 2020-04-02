import _ from 'lodash';
import React, { Component } from 'react';
import NoteForm from './NoteForm';
import { View, SafeAreaView, Text, Button, Modal, StyleSheet } from 'react-native';
import { updateNote, editNote, deleteNote } from './actions';
import { Spinner } from './common/index';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    containerButtons: {
        flexDirection: 'row'
    },
    containerModal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        flex: 1
    }

});

class NoteEdit extends Component {
    state = {
        modalVisible: false,
        deleted: false
      };

    constructor(props) {
        super(props);
        _.each(this.props.note, (value, prop) => {
            this.props.editNote({ prop, value });
        });
    }

    onSavePress() {
        this.props.updateNote({ title: this.props.title, body: this.props.body, id: this.props.id }, this.props);
    };

    onDeletePress() {
        this.setState({modalVisible: !this.state.modalVisible});
    };

    onDeleteConfirm() {
        this.props.deleteNote(this.props.note);
        this.setState({modalVisible: !this.state.modalVisible});
    };

    renderContent() {
        if (this.props.loading) {
                return <Spinner size="large"/>
            }
            
            return (
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible} 
                        onRequestClose={() => {
                            alert('Modal closed.');
                        }}>
                        <SafeAreaView style={styles.containerModal}>
                            <Text style={{ fontSize: 22, textAlign: 'center'}}>Deseja apagar a anotação {this.props.title}?</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <Button title="Apagar" onPress={this.onDeleteConfirm.bind(this)}/>
                                </View>
                                <View style={{flex: 1}}>
                                    <Button title="Cancelar" onPress={() => this.setState({modalVisible: !this.state.modalVisible})}/>
                                </View>
                            </View>
                        </SafeAreaView>
                    </Modal>
                    <NoteForm {...this.props} />
                    <View style={styles.containerButtons}>
                        <View style={styles.button}>
                            <Button title="Salvar" onPress={this.onSavePress.bind(this)}/>
                        </View>
                        <View style={styles.button}>
                            <Button title="Apagar" onPress={this.onDeletePress.bind(this)}/>
                        </View>
                        
                    </View>
                </View>
            )
        };


    render() {
        return (
            <View style={styles.container}>
                {this.renderContent()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { title, id, body, loading } = state.note;
    return { title, id, body, loading };
};

export default connect(mapStateToProps, { updateNote, editNote, deleteNote })(NoteEdit);