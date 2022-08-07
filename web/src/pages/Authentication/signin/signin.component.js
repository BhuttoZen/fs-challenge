import React from 'react';
import SignUpOrSignIn from '../../../components/signup-or-signin/signup-or-signin.component'

const SignIn = () => {
  return (
    <div>
        <SignUpOrSignIn isSignIn={true} />
    </div>
  );
}

export default SignIn;