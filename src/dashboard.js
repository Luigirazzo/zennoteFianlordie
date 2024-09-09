import React , { useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createClient } from "@supabase/supabase-js"; 
import { useEffect} from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const supabase = createClient("https://pufkuamgpnhopcwqpbsw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Zmt1YW1ncG5ob3Bjd3FwYnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMDkyNzMsImV4cCI6MjAzNTU4NTI3M30.pzB47UtjMCy0ubeta8u6gyqA29Grm8GeJgYdhZCyMdE");

const { data: { user } } = await supabase.auth.getUser();
console.log(user.id)
const cookies = new Cookies();
const root = ReactDOM.createRoot(document.getElementById('root'));
;
export default function Dashboard(){
  const navigate = useNavigate();
 // useEffect(() => {
   // cookies.remove('id', { path: '/' })
 //   }, [])

  
  function handleClick(item) {

  //  cookies.remove('id')
    cookies.set('id', JSON.stringify(item.id), { path: '/' });
    navigate('/edit');
  } 
  const[anemofaddfile, setAnemofaddfile] = React.useState("");
  function handleChange(event){
   
    setAnemofaddfile(event.target.value);
  }
        let [scrollcard,setscrollcard] = useState(0);
        const containerRef = useRef();
    
        const handlescrollLeft=()=>{
             containerRef.current.scrollLeft -= 500;
        }
    
        const handlescrollRight=()=>{
            containerRef.current.scrollLeft += 500;
        }
        // get the dta arry from supabase . its json so convert it to an array
        const [data, setData] = useState([]);
        const asyncFnnnn = async () => {
        const { data } = await supabase
        .from('Files')
        .select('id ,name')
        .eq('user', user.id)
        setData(data)
      };
      asyncFnnnn();
     
       function createfile(){
        const randn = require('randn');
        const cool = randn(10)+ ""
        const asyncFnnnn = async () => {
        const { error } = await supabase
        .from('Files')
        .insert({ id: cool, content: null, name: anemofaddfile , user: user.id })
      };
      asyncFnnnn();

       }
    
	return (
    <div className="dashboard">
       <h1 className='dashboard_title'>Welcome to your Zenboard</h1>
      
       
       <div className="dashboard_content">
         <p className='dashboard_content_latest_p'>Latest</p>
       <div className="main-slider-contianer"> 
             <button className="slider-icon left" onclick={(e)=>handlescrollLeft(e)}> left</button>
             <div className="slider" style={{scrollLeft:scrollcard}} ref={containerRef}>  
             
            {
            
                data.map((item,index)=>{
                      return(
                        <div className="slider-card" >
                        <img className="slider-card-image"  src='flowerlogo.jpg'/> 
                            <p className="slider-card-title" onClick={() => handleClick(item)}>{item.name}</p>
                            <p className="slider-card-description" onClick={() => handleClick(item)}>ok</p>
                        </div>
                      )
                 })
          
             }

             </div>
             <button className="slider-icon right"onclick={(e)=>handlescrollRight(e)}> right </button>
       </div>
       </div>
       <div className="toolbar">
       <Popup trigger={<img className="toolbar_addfile_img" src='plus.png' />} position="right center">
    <div className='dashboard-addfile-popup'>
      <input type="text" name="add file" className='dashboard-addfile-input'    value={anemofaddfile}
                    onChange={handleChange}/>
      <br/>
      <button className="dashboard-addfile-btn" onClick={createfile}>Add File</button>
    </div>
  </Popup>
       <img className="toolbar_uploadfile" src='cloud-upload.png'/>
      <img className="toolbar_addfolder" src='file-and-folder.png'/>


       </div>
    </div>
	);
}