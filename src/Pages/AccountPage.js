import React,{ useState }from 'react';


export default function AccountPage(props){

    const setIsLogin = props.setIsLogin;

    const [isRegistered, setIsRegistered] = useState(false)
    const [u_email, setEmail] = useState("")
    const [u_password, setPassword] = useState("")
    const [u_name,setName] = useState("")
    function registerUser() {
        setIsRegistered(true)
        document.getElementById("showRegister").style.display="inline";
    }

    const onchangeEmail  = (e) =>{
        
        setEmail(()=>e.target.value)
        

    }
    const onchangePassword  = (e) =>{
        
        setPassword(()=>e.target.value)

    }
    const onchangeName  = (e) =>{
        
        setName(()=>e.target.value)
        console.log(u_name)

    }


    const LoginAPI = async ()=>{
        try {
            const body = {u_email,u_password}
            const response = await fetch("http://localhost:5000/Login",{
            method:"POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body),
            })
            const data = await response.json()
            localStorage.setItem('token',data.token)
            setIsLogin(true)
           // window.location = "/home"
        } catch (err) {
            console.log(err.message)
        }
    }
    const RegisterAPI = async ()=>{

        try {
            const u_is_employee = false
            const body = {u_email, u_password, u_name, u_is_employee }

            const response = await fetch("http://localhost:5000/Register",{
                method:"POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            })
            const data = await response.json()
            localStorage.setItem('token',data.token)
            setIsLogin(true)
            // window.location = "/home"
            

        } catch (err) {
            console.error(err.message)
        }


    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      const passwordValidation = (password) => {
        // minimum 8 characters, at least one Uppercase letter and one number
        return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
      };

    function signIn() {
        if(!isRegistered){

            if([u_email, u_password].every(Boolean))
            {
                LoginAPI()   
            }

           
        }
        else 
        {
            if([u_email, u_password, u_name].every(Boolean))
            {
                if(validateEmail(u_email)&&passwordValidation(u_password))
                {
                    RegisterAPI()
                }
            }
           
        }
    }


    return(
        <div className="form ">
            <div className = "formContainer width">
                <div id = "showRegister" style={{display: "none"}}>
                <label>Name</label>
                <input  placeholder="Name" className="inputBox" onChange={onchangeName}></input>
                </div>
                <label>Email</label>
                <input placeholder="Email" className="inputBox" onChange={onchangeEmail}></input>
                <label>Password</label>
                <input type = "password" placeholder="Password" className="inputBox" onChange={onchangePassword}></input>
                <button className="btn btn-warning" onClick={signIn}>{!isRegistered ? "Sign In" : "Register"}</button>
                <a className="registerHere" onClick={registerUser}>Don't have an account? Click here to Register</a>
            </div>
        </div>
    )
}