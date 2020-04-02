import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './LoginForm';
import NotesList from './NotesList';
import { logout } from './actions';
import CreateNote from './CreateNote';
import NoteEdit from './NoteEdit';

class RouterComponent extends Component {
    
    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key="auth">
                        <Scene key="login" component={LoginForm} title="Login" initial />
                    </Scene>
                    <Scene key="main">
                        <Scene
                            rightTitle="Add"
                            leftTitle="Logout"
                            onRight={() => Actions.noteCreate()}
                            onLeft={() => logout()}
                            key="notes" component={NotesList} title="Minhas Anotações"
                            initial
                        />
                        <Scene key="noteCreate" component={CreateNote} title="Criar Anotação" />            
                        <Scene key="noteEdit" component={NoteEdit} title="Editar Anotação" />   
                                        
                    </Scene>
                </Scene>
            </Router>
        );
    };
};

export default RouterComponent;