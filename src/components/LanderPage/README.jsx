import React, { useState , useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import readmePath from './README.md'; //thi would be fetched from the back end


function Readme() {
  const [readme, setReadme] = useState('')

  useEffect( () => {
    fetch(readmePath)
      .then((response) => response.text())
      .then((text) => {
        setReadme(text);
      })
  })

  return(
    <div className={'mdContent'}>
      <ReactMarkdown source = {readme}/>
    </div>
  );
}

export default Readme;