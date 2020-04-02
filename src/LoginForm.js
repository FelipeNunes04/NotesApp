import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, changeUser, passwordChanged, loginUser } from './actions'
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Input, Spinner } from './common/index';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#eaeaea"
    },
    logo: {
        width: 250,
        height: 250
    },
    itemLogo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    inputView: {
        flex: 1
    }
});

class LoginForm extends Component {
  
    componentDidUpdate(prevProps) {
        const { error, loggedIn } = this.props;

        if (!prevProps.error && error) Alert.alert('error', error);

        if (loggedIn) {
            Actions.reset('main');
        }
    }
    
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.props.changeUser(user);
        });
    }

    _onEmailChange(email) {
        this.props.emailChanged(email);
    }

    _onPasswordChange(password) {
        this.props.passwordChanged(password);
    }

    _onLogin() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    _renderButton() {
        if (this.props.loading) {
            return <Spinner size="small"/>
        };

        return <Button onPress={this._onLogin.bind(this)} title="Login"/>
    }

    _renderError() {
        if (this.props.error) {
            return (
                <View>
                    <Text style={{color: 'red', fontSize: 18}}>{this.props.error}</Text>
                </View>
            );
        }
    }

    _renderLogo() {
        return (
            <View style={styles.itemLogo}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
              />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                { this._renderLogo() }
                <View style={styles.inputView}>
                    <Input
                        label="Email:" 
                        autoCorrect={true}   
                        placeholder="Email"
                        value={this.props.email}
                        onChangeText={this._onEmailChange.bind(this)}
                    />
                    <Input
                        secureTextEntry
                        label="Senha:"    
                        placeholder="Senha"
                        value={this.props.password}
                        onChangeText={this._onPasswordChange.bind(this)}
                    />
                    {this._renderError()}
                    {this._renderButton()}
                </View>
            </View>
           
        );
    }
};


const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        loading: state.auth.loading,
        error: state.auth.error,
        loggedIn: state.auth.user != null,
    };
};

export default connect(mapStateToProps, { 
    emailChanged, changeUser, passwordChanged, loginUser })(LoginForm);