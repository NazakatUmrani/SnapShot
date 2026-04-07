import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserAuth } from '@/context/userAuthContext';
import type { UserLogin } from '@/types/types';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import Gallery from '@/components/gallery';
import { toast } from 'react-toastify';
import MyButton from '@/components/MyButton';

interface ILoginProps {
}

const initialValues: UserLogin = {
  email: "",
  password: ""
}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const { login, googleSignIn, githubSignIn } = useUserAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<UserLogin>(initialValues);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleAuth = async (method: 'email' | 'google' | 'github') => {
    try {
      setIsLoggingIn(true);
      
      switch (method) {
        case 'email':
          if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
          }
          await login(formData.email, formData.password);
          toast.success("Login successful");
          navigate("/");
          break;
        case 'google':
          await googleSignIn();
          toast.success("Login successful");
          navigate("/");
          break;
        case 'github':
          await githubSignIn();
          toast.success("Login successful");
          navigate("/");
          break;
      }
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
    } finally {
      setIsLoggingIn(false);
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
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription>
              Enter your credentials below to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field className="grid grid-cols-2 gap-6">
                <MyButton 
                  variant="outline"
                  onClick={() => handleAuth('github')}
                  disabled={isLoggingIn}
                >
                  <FaGithub />
                  GitHub
                </MyButton>
                <MyButton 
                  variant="outline"
                  onClick={() => handleAuth('google')}
                  disabled={isLoggingIn}
                >
                  <FcGoogle />
                  Google
                </MyButton>
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
                  <div className="relative">
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
                <MyButton 
                  isLoading={isLoggingIn}
                  disabled={isLoggingIn}
                  onClick={() => handleAuth('email')}
                >Login</MyButton>
              </Field>
              <Label className="mx-auto w-fit text-sm text-muted-foreground">
                Don&apos;t have an account?
                <Link className='text-primary' to="/signup">Signup</Link> 
              </Label>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
