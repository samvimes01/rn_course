/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';


import {} from '../../store';
import startTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText';
import ButtonWithBcgrnd from '../../components/UI/ButtonWithBcgrnd';
import backgroundImage from '../../assets/background.jpg';
import validate from '../../utils/validation';
import tryAuth from '../../store/auth';

export class Auth extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    authMode: 'login',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode:
        dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login'
    }));
  };

  loginHandler = () => {
    const { controls: { email, password } } = this.state;
    // eslint-disable-next-line no-shadow
    const { tryAuth } = this.props;
    tryAuth({ email: email.value, password: password.value });
    startTabs();
  }

  updateInputState = (key, value) => {
    const { controls } = this.state;
    let connectedValue = {};
    if (controls[key].validationRules.equalTo) {
      const equalControl = controls[key].validationRules.equalTo;
      const equalValue = controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        confirmPassword: {
          ...prevState.controls.confirmPassword,
          valid:
              key === 'password'
                ? validate(
                  prevState.controls.confirmPassword.value,
                  prevState.controls.confirmPassword.validationRules,
                  connectedValue
                )
                : prevState.controls.confirmPassword.valid
        },
        [key]: {
          ...prevState.controls[key],
          value,
          valid: validate(
            value,
            prevState.controls[key].validationRules,
            connectedValue
          ),
          touched: true
        }
      }
    }
    ));
  };

  render() {
    const { controls: { email, password, confirmPassword }, viewMode, authMode } = this.state;

    let headingText = null;
    let confirmPasswordControl = null;

    if (viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please {authMode === 'login' ? 'Login' : 'Sign Up'}</HeadingText>
        </MainText>
      );
    }
    if (authMode === 'signup') {
      confirmPasswordControl = (
        <View
          style={
            viewMode === 'portrait'
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={confirmPassword.value}
            onChangeText={val => this.updateInputState('confirmPassword', val)}
            valid={confirmPassword.valid}
            touched={confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'android' ? '' : 'padding'}>
          {headingText}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your E-Mail Address"
                style={styles.input}
                value={email.value}
                onChangeText={val => this.updateInputState('email', val)}
                valid={email.valid}
                touched={email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <View
                style={
                  viewMode === 'portrait'
                  || authMode === 'login'
                    ? styles.portraitPasswordContainer
                    : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    viewMode === 'portrait'
                    || authMode === 'login'
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput
                    placeholder="Password"
                    style={styles.input}
                    value={password.value}
                    onChangeText={val => this.updateInputState('password', val)}
                    valid={password.valid}
                    touched={password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <ButtonWithBcgrnd
            color="#29aaf4"
            onPress={this.loginHandler}
            disabled={!email.valid || !password.valid || (!confirmPassword.valid && authMode === 'signup')}
          >
            Submit
          </ButtonWithBcgrnd>
          <ButtonWithBcgrnd
            color="#29aaf4"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {authMode === 'login' ? 'Sign Up' : 'Login'}
          </ButtonWithBcgrnd>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
});

export default connect(null, { tryAuth })(Auth);
