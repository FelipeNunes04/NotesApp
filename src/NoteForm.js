import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from './common/index';
import { connect } from 'react-redux';
import { editNote } from './actions';



class NoteForm extends Component {
    render() {
        return (
            <View>
                <Input 
                    placeholder="Titulo"
                    value={this.props.title}
                    onChangeText={value => this.props.editNote({prop: 'title', value})}
                />
                <Input 
                    placeholder="Descrição"
                    value={this.props.body}
                    onChangeText={value => this.props.editNote({prop: 'body', value})}
                />
            
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    const { title, body } = state.note;
    return { title, body };
};

export default connect(mapStateToProps, { editNote })(NoteForm);