import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { UserSignUp } from '@/types/types';
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { useUserAuth } from '@/context/userAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import Gallery from '@/components/gallery';

interface ISignupProps {
}

const initialValues: UserSignUp = {
  email: "",
  password: "",
  confirmPassword: ""
}

const Signup: React.FunctionComponent<ISignupProps> = () => {
  const { signUp, googleSignIn, githubSignIn } = useUserAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<UserSignUp>(initialValues);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSignUp = async () => {
    try {
      await signUp(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleGithubSignUp = async () => {
    try {
      await githubSignIn();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  
  return (
    <div className='flex h-full p-6 container items-center'>
      <Gallery />
      <div className='w-full max-w-sm'>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field className="grid grid-cols-2 gap-6">
                <Button 
                  variant="outline"
                  onClick={handleGithubSignUp}
                >
                  <FaGithub />
                  GitHub
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleGoogleSignUp}
                >
                  <FcGoogle />
                  Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={changeFormData}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className='relative'>
                  <Input 
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={changeFormData}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </span>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="cpassword">Password</FieldLabel>
                <div className='relative'>
                  <Input 
                    name="confirmPassword"
                    id="cpassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={changeFormData}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </span>
                </div>
              </Field>
              <Field>
                <Button onClick={handleSignUp}>Signup</Button>
              </Field>
              <Label className="mx-auto w-fit text-sm text-muted-foreground">
                Already have an account?
                <Link className='text-primary' to="/login">Login</Link> 
              </Label>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
