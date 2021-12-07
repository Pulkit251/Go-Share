import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Data from "./Data";
import { auth, provider } from "./firebase";
function App() {
  const [user,setUser] = useState(null)
  const signIn=()=>{
    auth.signInWithPopup(provider).then(({user}) => {
      setUser(user)
    }).catch(error=>{
      alert(error.message);
    })
  }
  return (
    <>
    {
      user ? (
          <>
            <Header photoURL={user.photoURL}/>
            <div className="App">      
              <Sidebar/>
              <Data/>
            </div>
          </>
      ):(
        <div className="loginWrap">
          <img src="https://media.istockphoto.com/vectors/cloud-flat-icon-vector-symbol-or-logo-simple-cloud-vector-id1197848576?k=20&m=1197848576&s=170667a&w=0&h=n0iPLfsDYY7cDZXZ7xHrn3IE_ME6h42GVysm4xQCPps=" alt=""/>
          <button onClick={signIn}>Login to go share</button>
        </div>
      )
    }
    
    </>
  );
}

export default App;
