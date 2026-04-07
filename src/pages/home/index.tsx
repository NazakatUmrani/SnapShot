import MyButton from '@/components/MyButton';
import { useUserAuth } from '@/context/userAuthContext';
import { useState, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IHomeProps {
}

const Home: FunctionComponent<IHomeProps> = (props) => {
    const { logOut } = useUserAuth();
    const navigate = useNavigate();

    const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);
            logOut();
            toast.success("Signout successful");
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error("Signout failed");
        } finally {
            setIsSigningOut(false);
        }
    }

    return (
        <>
            <div>
                Home
            </div>
            <MyButton
                disabled={isSigningOut}
                isLoading={isSigningOut}
                onClick={handleSignOut}
            >Signout</MyButton>
        </>
    );
};

export default Home;
