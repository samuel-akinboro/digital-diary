import React from 'react'
import {auth, provider, db} from '../Firebase/Firebase.js'
import {connect} from 'react-redux'
import googleLogo from '../assets/images/g-logo.png'


function Login({dispatch}) {

    const handleClick = () => {
        auth
  .signInWithPopup(provider)
  .then((result) => {
    var loggedInUser = {...result.user.providerData[0]};
    console.log(result.user)
    db.collection("users").doc(loggedInUser.uid).collection("details").doc(loggedInUser.uid).set({
        ...loggedInUser
    })
    dispatch({type: "SET_USER", userDetails:{...loggedInUser}});

    // checking if the user already has an account in the database
    // ...
  }).catch((error) => {
    // Handle Errors here.
    // var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // ...

    console.log(errorMessage)
  });
    }

    return (
        <div className="bg-gray-100 h-screen w-screen absolute z-50 flex justify-center items-center">
            <div className="container bg-white p-4 w-72 shadow-lg rounded-xl flex flex-col h-64 justify-center">
                <img src={googleLogo} alt="google logo" className="w-16 mx-auto object-contain mt-4" />
                <button 
                    className="bg-blue-500 mx-auto py-2 px-8 mt-20 text-white rounded-full"
                    onClick={handleClick}
                >Login with google</button>
            </div>
        </div>
    )
}

export default connect((state)=> ({...state}))(Login)