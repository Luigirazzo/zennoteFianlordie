import React , { useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createClient } from "@supabase/supabase-js";
import 'quill/dist/quill.snow.css'
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Cookies from 'universal-cookie';
const supabase = createClient("https://pufkuamgpnhopcwqpbsw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Zmt1YW1ncG5ob3Bjd3FwYnN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMDkyNzMsImV4cCI6MjAzNTU4NTI3M30.pzB47UtjMCy0ubeta8u6gyqA29Grm8GeJgYdhZCyMdE");
const root = ReactDOM.createRoot(document.getElementById('root'));
const cookies = new Cookies();

export default function Edit(){
	
	const file = cookies.get('id')
	console.log(file)
  const editor = useRef(null);
  cookies.remove('cookie name')
	const [content, setContent] = useState('');
	const navigate = useNavigate();
	const asyncFnnnn = async () => {
		
		const { data, error } = await supabase
		.from('Files')
		.select('content')
		.eq('id', file)
		const rowString = JSON.stringify(data[0].content);
		const jsonStringWithoutQuotes = rowString.substring(1, rowString.length - 1);
		const cleanedString = DOMPurify.sanitize(jsonStringWithoutQuotes);
		//some issue with /&quot being added to the string when returning it from firebase idk why but its fixed
		setContent(cleanedString.replace(/&quot;|\\/g, ''));
	  };
	  asyncFnnnn();
	 
	function handleClick() {
	
	    const asyncFnnn = async () => {
		
			const { error } = await supabase
			.from('Files')
			.update({ content: content})
			.eq('id', file)
		
			
			
		   console.log(error)
		}
		  asyncFnnn();
		 
	   
					 
	
	   
			navigate('/dashboard');
		}
	
	
		  
  document.body.style.backgroundImage = `url(/chilled2_.webp)`
	const config = useMemo(
		() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
     toolbarButtonSize: 'large',
     width: "100vw",
     height: '142.8vw',
     
     
     
    
     
 


		}),
  
	    
	);
   
	return (
    <div className="editor" style={{ backgroundImage: "url(/chilled2.webp)" }}>
		 <div className='headeredit'>
	
         <img className='header_editor_logo' src='pfeil-nach-links.png' onClick={handleClick} />
	<h1 className='edit_title'>{cookies.get('id')}</h1>
	<img className='header_editor_logo' src='user.png'/>
    </div>
    <div className="editor_headbar">
    </div>
    <div className="jodit-editor-container">

		<JoditEditor
			ref={editor}
			value={content}
            style={{}}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			
		/>
    </div>
    </div>
	);
}
    
    