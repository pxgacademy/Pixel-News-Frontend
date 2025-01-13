import { Link } from 'react-router-dom';
import SectionContainer from '../../components/container/SectionContainer';
import HookForm from '../../hooks/useHookForm';

const Register = () => {
    const fields = [
       {
         name: "name",
         label: "Name",
         type: "text",
         validation: {
           required: true,
         },
         errorMessages: {
           required: "Name is required",
         },
         placeholder: 'Enter your full name'
       },
       {
         name: "email",
         label: "Email",
         type: "email",
         validation: {
           required: true,
         },
         errorMessages: {
           required: "Email is required",
         },
          placeholder: 'Enter your email'
       },
       {
         name: "password",
         label: "Password",
         type: "password",
         isEye: true,
         validation: {
           required: true,
           minLength: 6,
           maxLength: 20,
           pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[0-9])/,
         },
         errorMessages: {
           required: "Password is required",
           minLength: "Password must be more than 6 characters",
           maxLength: "Password must be less than 20 characters",
           pattern:
             "Password must include one uppercase, one lowercase, one number, and one special character",
         },
          placeholder: 'Enter your password'
       },
       {
        name: "image",
        label: "Photo",
        type: "file",
        validation: {
          required: true,
        },
        errorMessages: {
          required: "Photo is required",
        },
      },
     ];
   
     const handleSubmit = (data, reset) => {
       console.log(data);
       reset();
     };
   
     return (
       <SectionContainer>
         <h1 className="text-2xl md:text-4xl font-bold text-center font-davidLibre">
           Welcome to Pixel News!
         </h1>
         <div className="w-full max-w-lg mx-auto mt-6 bg-white p-6 rounded-xl shadow-xl">
           <HookForm fields={fields} onSubmit={handleSubmit} btnName="Register" />
           <p className="text-center text-sm mt-2">
          Already have an account? Please{" "}
          <Link to="/login" className="text-info">
            Login
          </Link>
        </p>
         </div>
       </SectionContainer>
     );
};

export default Register;