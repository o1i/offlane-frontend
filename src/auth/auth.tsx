import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

interface props  {
    setToken: Function,
    setLbDict: Function,
    authShow: boolean,
    setUserLevel: Function
}

export const AuthDialog = ({setToken, authShow, setUserLevel}: props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let onSubmit: () => void = (() => {
        const auth_dict = {"email": email, "password": password}
        const url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL) + "auth"
        fetch(url, {method: "post", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(auth_dict)})
        .then(r => r.ok && r.json())
        .then(j => {setToken(j.access_token); return j.access_token;})
        .then(t => setUserLevel(JSON.parse(atob(t.split('.')[1])).identity.user_type))
    })

    return (
      <Dialog open={authShow}>
        <DialogTitle>Log in</DialogTitle>
          <input id="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)}/>
          <input id="passwort" placeholder="Passwort" value={password} onChange={event => setPassword(event.target.value)}/>
          <Button onClick={onSubmit}>Login</Button>
      </Dialog>
    );
  };
