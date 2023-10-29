import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import './camera.css'
import { Table } from './table'

import LoadingSpinner from './loading'

import axios from 'axios'

const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}



var  camerIcon=  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
<path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
<path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
  </svg> ;


var fileIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16">
<path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
</svg>







const Profile = () => {
    const [picture, setPicture] = useState('')
    const [objectName,setObjectName]=useState("")
    const [tableShow,setTableShow]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const webcamRef = React.useRef(null)


    const sendImage=(e)=>
    {
      setIsLoading(true);
    const imageSrc  = webcamRef.current.getScreenshot()
    
    // Convert the data URL image into a Blob
    
    if(imageSrc!='')
    { 
        setPicture(imageSrc)
        axios.post('https://nutrationflask.onrender.com/captureImage',{ 
            image: imageSrc
        })
        .then(res => {
            setObjectName(res.data.Output)
            setTableShow(true)
            //setIsLoading(false)
          })
          .catch(error => {
            console.error('Error sending image:', error);
            setIsLoading(false);
          });
    }
    e.preventDefault()
}

useEffect(()=>
{
console.log("statud",isLoading);

},[isLoading])

const handleImageSelect = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];

    if (file) {
      setPicture(URL.createObjectURL(file));
      // Create a FormData object and append the image to it
      const formData = new FormData();
      formData.append('image', file);
      
  
      // Send a POST request to the Flask back-end
      fetch('https://nutrationflask.onrender.com/selectimage', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Return the promise
        })
        .then((data) => {
            setObjectName(data.Output)
            setTableShow(true)
            setIsLoading(false)
            
        })
        .catch((error) => {
          console.error('Error sending image:', error);
          setIsLoading(false);
        });
    }
    e.preventDefault();
  };


  const renderUser=(

    <section id="homeSection" className="home-section">
    <div className="home-section-conten-box">
        <div className="home-section-content">
               <div >
     {picture == '' ? (
      <Webcam
        audio={false}
        height={"400px"}
        ref={webcamRef}
        width={"400px"}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className='Webcam-main'
      /> ) : (<div> 

      <img src={picture}  height={"300px"} width={"300px"}/>
      <h1 className='food-Name'>{objectName}</h1>
      
      </div>
      
        )}
   
   </div>
        </div>
        {picture != '' ? (
      <button
        onClick={(e) => {
          e.preventDefault()
          setPicture('')
          setObjectName('')
        }}
        className="button-7"
      >
        Retake Image
      </button>
    ) : (

        <div className='button-submit'>
            <button onClick={sendImage} className="button-5">{camerIcon}  Capture Image </button>
            <label for="file" class="button-6 input"> {fileIcon} Select Image</label>
             <input type="file" id="file" accept="image/*" onChange={handleImageSelect} />

              
        </div>
    )}   
    </div>
    {tableShow===true && objectName!=''?(<div className="home-section-img">
    <Table footName={objectName}  loadingState={setIsLoading} />

    </div>):("")}


</section>
    
  )


  return (
    <div>
      {isLoading ? <LoadingSpinner/>:renderUser}
    </div>

  )
}
export default Profile



