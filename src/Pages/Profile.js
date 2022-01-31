import React, {useState,useEffect}from 'react';


function Profile(props) {

    const setIsLogin = props.setIsLogin
    const [Name,setName] = useState(()=>{return ""})

    const nameAPI = async ()=>{

        try {
            const response = await fetch('http://localhost:5000/profile/name',{
            method:"GET",
            headers: {token: localStorage.token}
            })
            const data = await response.json()
            setName(()=>data.u_name)
        } catch (err) {
            console.error(err.message)
        }

    }





    useEffect(()=>{
        nameAPI()
    },[Name])

    const Logout = ()=>{
        localStorage.removeItem('token')
        setIsLogin(false)
        
    }

    return (<div>
    <h1>HELLO!!&nbsp;{Name}</h1>
    <button className="btn btn-primary mt-2 btnLogout" onClick={Logout}>Logout</button>
    </div>);
}

export default Profile;