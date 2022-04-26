import React, {useEffect}  from 'react'
import axios from 'axios'
import {DatePicker} from 'antd'
function LandingPage(props) {
   useEffect(()=>{
       axios.get('/api/hello')
       .then(response=> console.log(response.data))
   },[])
    return (
        <div>
            <DatePicker/>
        </div>
    );
}

export default LandingPage;