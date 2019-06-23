/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import DefaultInput from '../../components/UI/DefaultInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText';
import ButtonWithBcgrnd from '../../components/UI/ButtonWithBcgrnd';
import backgroundImage from '../../assets/background.jpg';
import validate from '../../utils/validation';
import { tryAuth, authAutoSignIn } from '../../store/auth';

const initialState = {
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

// eslint-disable-next-line no-shadow
const Auth = ({ authAutoSignIn, isLoading, tryAuth }) => {
  const [authState, setAuthState] = useState(initialState);
  const { controls: { email, password, confirmPassword }, viewMode, authMode } = authState;

  const updateStyles = (dims) => {
    setAuthState({
      ...authState,
      viewMode:
        dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', updateStyles);
    authAutoSignIn();
    return () => Dimensions.removeEventListener('change', updateStyles);
  }, []);


  const switchAuthModeHandler = () => {
    setAuthState({
      ...authState,
      authMode: authMode === 'login' ? 'signup' : 'login'
    });
  };

  const authHandler = () => {
    // eslint-disable-next-line no-shadow
    tryAuth({ email: email.value, password: password.value }, authMode);
  };

  const updateInputState = (key, value) => {
    const { controls } = authState;
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
    setAuthState({
      ...authState,
      controls: {
        ...controls,
        confirmPassword: {
          ...controls.confirmPassword,
          valid:
              key === 'password'
                ? validate(
                  controls.confirmPassword.value,
                  controls.confirmPassword.validationRules,
                  connectedValue
                )
                : controls.confirmPassword.valid
        },
        [key]: {
          ...controls[key],
          value,
          valid: validate(
            value,
            controls[key].validationRules,
            connectedValue
          ),
          touched: true
        }
      }
    });
  };


  let headingText = null;
  let confirmPasswordControl = null;
  let submitButton = (
    <ButtonWithBcgrnd
      color="#29aaf4"
      onPress={authHandler}
      disabled={(!confirmPassword.valid && authMode === 'signup') || !email.valid || !password.valid}
    >
      Submit
    </ButtonWithBcgrnd>
  );

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
          onChangeText={val => updateInputState('confirmPassword', val)}
          valid={confirmPassword.valid}
          touched={confirmPassword.touched}
          secureTextEntry
        />
      </View>
    );
  }
  if (isLoading) {
    submitButton = <ActivityIndicator />;
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
              onChangeText={val => updateInputState('email', val)}
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
                  onChangeText={val => updateInputState('password', val)}
                  valid={password.valid}
                  touched={password.touched}
                  secureTextEntry
                />
              </View>
              {confirmPasswordControl}
            </View>
          </View>
        </TouchableWithoutFeedback>
        {submitButton}
        <ButtonWithBcgrnd
          color="#29aaf4"
          onPress={switchAuthModeHandler}
        >
          Switch to {authMode === 'login' ? 'Sign Up' : 'Login'}
        </ButtonWithBcgrnd>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

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

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading
});

export default connect(mapStateToProps, { tryAuth, authAutoSignIn })(Auth);
