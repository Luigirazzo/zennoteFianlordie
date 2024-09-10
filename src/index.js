import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './app.js'
import {  Route, Routes, Link } from 'react-router-dom';
import Dashboard from './dashboard.js';
import Edit from './edit.js';
const supabase = createClient("https://pufkuamgpnhopcwqpbsw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Zmt1YW1ncG5ob3Bjd3FwYnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMDkyNzMsImV4cCI6MjAzNTU4NTI3M30.pzB47UtjMCy0ubeta8u6gyqA29Grm8GeJgYdhZCyMdE",{
  storeUserMetadata: true,
});
const root = ReactDOM.createRoot(document.getElementById('root'));

export default function Load_landingpage(){

  function Header(){
    return(
      <div className='header'>
      <div className='header_left'>
       <img className='header_logo' src='zenote_transparent.png'/>
       <h1 className='title'>ZenNote</h1>
       </div>
      <div className='header_right'>
      <img className='header_account' src='user.png'/>
      </div>
  
    </div>
    )
  }
  
  function Landingpage(){
    function Land_introduction(){
      //just the logo with a little zen touch some header and an discription
      return(
        <div>
           <img src='zenote_transparent.png'/>
           <h1>ZenNote</h1>
           <p>Your distraction free note taking app</p>
        </div> 
      )
    }
    function Land_login(){
      //login with google and supabase
     
        const asyncFn = async () => {
          
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:3000/dashboard'
        
        }
      });
    
      }
     
    
    
  
    
  
        //google login using supabase
  
       
      return(
        <div className='land_login'>
          <button className='land_login_button' onClick={asyncFn}>
        
          <img src='google.png'  alt='Google Logo' width='25' height='25' className='land_login_button_logo'/>
  
           Login with Google
          </button>
        </div>
      )
    }
  
  
    return(
      <div className='landingpage'>
            <div className='land_intro'>
            <Land_introduction/>
        <Land_login/>
        </div>
      </div>
    )
  }

return(
  <div>
  <Header/>
  <Landingpage/>
  </div>
  
);
}
function main(){
root.render(
  <Landingpage/>
)
}


main();


