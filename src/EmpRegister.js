import React,{useState}from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Zoom} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { Button, Label, Modal,Tabs } from 'flowbite-react';
  import { useNavigate } from "react-router-dom";
  import EmpDash from './EmpDash';
  import { ReactSession } from 'react-client-session';

const EmpRegister = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("localStorage");
  
    const [openModal, setOpenModal] = useState(String | undefined);
    const props = { openModal, setOpenModal };
    const [formData,setFormData]=useState({
      email:"",
      username:"",
      phone:"",
      password:"",
      status:"Inactive"
    });
    const [adminData,setAdminData]=useState({
      adminEmail:"",
      adminPassword:""
    })
    const [empData,setEmpData]=useState({
      empEmail:"",
      empPassword:""
    })
    const adminHandleChange=(e)=>{
      const {name,value}=e.target;
      setAdminData((prev)=>{
        return{...prev,[name]:value}
      })
      console.log(adminData);
    }
    const adminLogin=()=>{
      if(adminData.adminEmail==='vikassoni@admin' && adminData.adminPassword==='admin'){
        toast.success('Succesfull Logged in', {
          autoClose:2000,
          position: toast.POSITION.TOP_RIGHT
      })
      
      
      setTimeout(function () {
        navigate("/admindash");
    }, 2000);
       
        
      }
      else{
        toast.error('Incorrect Credentials', {
          transition: Zoom,
          autoClose:2000,
          position: "bottom-right",
        })
      }
    }
    const empHandleChange=(e)=>{
      const {name,value}=e.target;
      setEmpData((prev)=>{
        return{...prev,[name]:value}
      })
      console.log(empData);
    }
    const empLogin=(e)=>{
     
      var empmail=empData.empEmail;
      var emppassword=empData.empPassword;
      axios.post('http://localhost:5001/login',{empmail,emppassword}).then(result=>{
        // console.log(result)
        if(result.data!=='Contact to Admin' && result.data!=='The Password incorrect'){
          console.log(result.data)
          ReactSession.set("username",result.data.username);
          ReactSession.set("id",result.data._id);
          ReactSession.set("email",result.data.email);
          toast.success('Succesfull Logged in', {
            autoClose:2000, 
            position: toast.POSITION.TOP_RIGHT
        })
     
        setTimeout(function () {
          navigate("/empDash");
      }, 2000);
         
          
        }
        else{
          console.log(result.data)
          toast.error(result.data, {
            transition: Zoom,
            autoClose:2000,
            position: "bottom-right",
          })
        }
      }).catch(err=>console.log(err))

    }
    const handleChange=(e)=>{
      const {name,value}=e.target;
      setFormData((prev)=>{
        return {...prev,[name]:value};
      })
      
     
  console.log(formData);
 
     
    };
    var erorr=0
   
    const handleSubmit=(e)=>{
      e.preventDefault();
     
      let errors ={}

    if(!formData.email){
        errors.email="Email Required"
        toast.error(errors.email, {
            transition: Zoom,
            position: "bottom-right",
          })
          erorr++
    }
    else if(formData.email.length<7){
        errors.email="Emali Should be of minimum 7 character"
        toast.error(errors.email, {
            transition: Zoom,
            position: "bottom-right",
          })
          erorr++
    }
    
    
    if(!formData.username){
        errors.username="Username Required"
        toast.error(errors.username, {
            transition: Zoom,
            position: "bottom-right",
          })
          erorr++
    }
    else if(formData.username.length<5){
        errors.username="Username must be more than 5 character"
        toast.error(errors.username, {
            transition: Zoom,
            position: "bottom-right",
          })
          erorr++
    }

    if(!formData.phone){
        errors.phone="Phone Number Required"
        toast.error(errors.phone, {
            transition: Zoom,
            position: "bottom-right",
          })
          erorr++
    }
    else if(formData.phone.length>10 || formData.phone.length<10){
        errors.phone="Phone Number must be of 10 digit"
        toast.error(errors.phone, {
            transition: Zoom,
            position: "bottom-right",
          })
          erorr++
    }
    if(!formData.password){
        errors.password="Password Required"
        toast.error(errors.password, {
            transition: Zoom,
            position: "bottom-right",
          })
          erorr++
    }
    else if(formData.password.length<8){
        errors.password="Password must be more than 8 character"
        toast.error(errors.password, {
            transition: Zoom,
            position: "bottom-right",
          })
          erorr++
    }
    if(erorr===0)
    {
        axios.post('http://localhost:5001/api/insert',formData).then((response)=>{
        
      toast.success('Thankyou For Registering Yourself!', {
        autoClose:2000,
        position: toast.POSITION.TOP_RIGHT
    });
      setTimeout(function () {
        window.location.reload()
    }, 2000);
    
      setFormData.email("")
        console.log(response)
      }).catch((e)=>{
        console.log(e)
      });
      
    }
        
      
    };
  return (
    <>
      <div className='bg-slate-800 h-screen w-screen pb-5 text-white text-xl flex flex-col place-items-center'>
     
      
        
        
     <div className='bg-white h-auto w-70 rounded-lg shadow-md shadow-white border border-purple-600 px-5 my-10  sm:my-auto md:my-auto'>
     <div className='flex justify-center'>
         <div>
         <button type="button" data-modal-target="adminmodal" data-modal-toggle="adminmodal" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-md shadow-purple-500/50 dark:shadow-md dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4 mt-4 "  onClick={() => props.setOpenModal('adminmodal')}>Admin Login</button>
        
         {/* Admin Modal */}
 
         
 
 
 
         {/* Admin Modal Ends */}
         </div>
         <div>
         <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-md shadow-purple-500/50 dark:shadow-md dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4 mt-4" onClick={() => props.setOpenModal('employeemodal')}>Employee Login</button>
 
 
         {/* Employee Modal  */}
 
        
 
 
 
 
 
 
 {/* Employee Modal Ends */}
 
         </div>
       
       
 </div>
       </div>
        
      
       <div className='bg-white h-auto w-70 rounded-lg shadow-md shadow-white border border-purple-600 px-5'>
      
       <form onSubmit={handleSubmit} autoComplete='on'>
         <div><p className=' text-2xl font-semibold text-purple-800 uppercase'>Employee Management System</p>
         <p className='font-semibold text-center text-xl text-purple-800'>Enter All Details</p>
         </div>
 <div>   
 <label htmlFor="email" className="block mb-2 text-sm font-medium text-purple-600 dark:text-white">Your Email</label>
 <div className="relative mb-6">
   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
     <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
   </div>
   <input type="email"  value={formData.email} name="email" className=" caret-purple-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "  placeholder="email@employee"  onChange={handleChange}/>
 </div>
 <label htmlFor="username" className="block mb-2 text-sm font-medium text-purple-600 dark:text-white">Username</label>
 <div className="relative mb-6">
   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
     <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/></svg>
  
   </div>
   <input type="text" value={formData.username} name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@employee"  onChange={handleChange}/>
 </div>
 <label htmlFor="phone" className="block mb-2 text-sm font-medium text-purple-600 dark:text-white mt-7">Your Phone Number</label>
 <div className="relative mb-6">
   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
     <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
     <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/></svg>
 
   </div>
   <input type="tel" value={formData.phone} name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone@employee"  onChange={handleChange}/>
 </div>
 <label htmlFor="password" className="block mb-2 text-sm font-medium text-purple-600 dark:text-white mt-7">Password</label>
 <div className="relative mb-6">
   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
     <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
     <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z"/></svg>
 
   </div>
   <input type="password" value={formData.password} name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*****"   onChange={handleChange}/>
 </div>
 <div className='text-center'>
 <button type="submit" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" name='register'  >Save</button>
 <ToastContainer />
 </div>
 </div>
 </form>
 <form>
       <Modal show={props.openModal === 'adminmodal'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
         <Modal.Header />
         <Modal.Body>
           <div className="space-y-6 ">
             <h3 className="text-xl font-medium text-purple-800 text-center dark:text-white">Admin Login</h3>
             <div>
             <div className='flex justify-center'>
                    <img src='/admin.png' className='rouned rounded-full w-40 h-40' alt=''/>
                </div>
               <div className="mb-2 block">
                 <Label htmlFor="adminEmail" value="Your email" className='text-purple-600'/>
               </div>
               <input className=" caret-purple-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "  type='email' onChange={adminHandleChange} name="adminEmail"placeholder="email@admin" required />
             </div>
             <div>
               <div className="mb-2 block">
                 <Label htmlFor="adminPassword" value="Your password" className='text-purple-600' />
               </div>
               <input className=" caret-purple-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "  onChange={adminHandleChange}  type='password' name="adminPassword"   placeholder='*****' required />
             </div>
            
             <div className="w-full justify-center flex">
               <Button className='"text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg ' onClick={adminLogin}>Log in to your account</Button>
             </div>
          
           </div>
         </Modal.Body>
       </Modal>
       </form>
      
         
       </div>

     </div>
     <div>
    <Modal show={props.openModal === 'employeemodal'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
         <Modal.Header />
         <Modal.Body>
           <div className="space-y-6">
             <h3 className="text-xl font-medium text-purple-800 text-center dark:text-white">Employee Login</h3>
            
             <div>
             <div className='flex justify-center'>
                    <img src='/emp.png' className='rouned rounded-full w-40 h-40' alt=''/>
                </div>
               <div className="mb-2 block">
                 <Label htmlFor="empEmail" value="Your email"  className='text-purple-600'/>
               </div>
               
               <input type='email'  name="empEmail" className=" caret-purple-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "    placeholder="email@employee" onChange={empHandleChange} required />
             </div>
             <div>
               <div className="mb-2 block">
                 <Label htmlFor="empPassword" value="Your password"  className='text-purple-600' />
               </div>
               <input className=" caret-purple-600 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "  onChange={empHandleChange} name="empPassword"   type="password" placeholder='*****' required />
             </div>
             
             <div className="w-full justify-center flex">
               <Button className='"text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg ' onClick={empLogin}>Log in to your account</Button>
             </div>
             <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
               Not registered?&nbsp;
               <a href="/" className="text-cyan-700 hover:underline dark:text-cyan-500">
                 Create account
               </a>
             </div>
           </div>
         </Modal.Body>
       </Modal>
       </div>
      
    </>
  )
}

export default EmpRegister
