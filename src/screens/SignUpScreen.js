import React, {useState, useEffect} from "react";
import {Animated, View} from 'react-native';
import {useSelector} from "react-redux";

import Styles from "./styles";
import SignUpForm from "../components/auth/sign-up/SignUpForm";
import ActionButton from "../components/common/button/ActionButton";
import {isSubmitting, manageFade} from "../util/common.util";
import DefaultActivityIndicator from "../components/common/activity-indicator/DefaultActivityIndicator";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Status from '../util/status.util'
import Screens from '../util/screen-name.util'


const SignUpScreen = ({navigation}) => {
    const status = useSelector(state => {
        console.log(state)
        return state.auth.status
    });
    const error = useSelector(state => state.auth.error);
    const verificationDestination = useSelector(state => state.auth.userVerification.dest)
    const username = useSelector(state => state.auth.user.username)

    const [opacity] = useState(new Animated.Value(1))
    manageFade(status, opacity)

    useEffect(() => {
        if (status === Status.USER_NOT_CONFIRMED) {
            navigation.navigate(Screens.EMAIL_VERIFICATION, {email: verificationDestination, username: username})
        }
    })

    return (
        <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <Animated.View style={[Styles.container, {opacity}]} pointerEvents={isSubmitting(status) ? 'none' : 'auto'}>
                {isSubmitting(status) && <DefaultActivityIndicator/>}
                <SignUpForm status={status} error={error}/>
                <ActionButton title="Already have an account? Sign In now"
                              onPress={() => navigation.navigate(Screens.SIGN_IN)}/>
            </Animated.View>
        </KeyboardAwareScrollView>
    )
}

export default SignUpScreen;