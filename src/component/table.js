import React from "react";

import { useEffect } from "react";

import { useState } from "react";

import LoadingSpinner from "./loading";

import './table.css'



const key="f5fuNcsPy2ew11gimnI7yhE8vY3ujzh9E61ogmtO"
export const Table=({footName})=>
{
   const [records,setRecords] = useState([])
   const columns=(["Nutrient Name","Value","Unit","% Daily Value"]);
   const [loadingstate,setIsLoading]=useState(true);
   
    useEffect(()=>
    {
        fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${footName}&pageSize=2&api_key=${key}`).then(res=>res.json())
        .then(data=>{
             setRecords(data.foods[0].foodNutrients)
             setIsLoading(false);
            
        }).catch(error=>{
            console.log("API error",error)
            setIsLoading(false);
        })
    },[])



    const rendervalue = (
        <table>
            <thead>
                <tr>
                {columns.map((item,index) => (  
                    <th id={index}>  
                    {item}  
                </th>  
                ))} 
                </tr>
        </thead>
        <tbody>
            {records.map((item, index) => (
                <tr key={index}>
                <td>{item.nutrientName}</td>
                <td>{item.value}</td>
                <td>{item.unitName}</td> 
                <td>{item.percentDailyValue}</td>
            </tr>
            ))}
      </tbody>
    </table>


    )





    return (  
        <div >
            {loadingstate==true?(
                <LoadingSpinner/>
               
            ):(
                rendervalue
            )}


        </div>
      ); 

};
