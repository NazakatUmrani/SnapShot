import { Button } from '@/components/ui/button';
import { useUserAuth } from '@/context/userAuthContext';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const { logOut } = useUserAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            logOut();
            toast.success("Signout successful");
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error("Signout failed");
        }
    }

    return (
        <>
            <div>
                Home
            </div>
            <Button
                onClick={handleSignOut}
            >Signout</Button>
        </>
    );
};

export default Home;
