import { useState } from "react";
import './Display.css';

const Display = ({account, contract}) => {

    const [data, setData] = useState('');  //store the data of the images or images

    const getData = async () => {

        let dataArray;
        const otherAddress = document.querySelector('.address').value;  //taking the value from input value

        //check if we have other address , if yes then call the display function from contract to -
        //show the array of data
        if (otherAddress) {
            dataArray = await contract.display(otherAddress);
            console.log(dataArray);
        }
        else{
            //if no other then show for current account  
            dataArray = await contract.display(account); 
        }

        const isEmpty = Object.keys(dataArray).length === 0;

        if (!isEmpty) {
            const str = dataArray.toString();   //image url
            const str_array = str.split(",");   // array of image links
            // console.log(str);
            // console.log(str_array);
            const images = str_array.map((item, i) => {
                return(
                    <a href={item} key={i} target='_blank'>
                        <img key={i} src={`https://gateway.pinata.cloud/ipfs${item.substring(6)}`}
                        alt='new'
                        className="image-list"></img>
                    </a>
                )
            });

            setData(images);
        }
        else {
            alert('No file to display');
        }

    };
    return <>
    <div className="image-list">{data}</div>

    {/* input for taking address and showing its images */}
    <input type='text' placeholder="Enter Address" className="address"/>
    <button className="center button" onClick={getData}> Get Data </button>
    </>
};

export default Display;