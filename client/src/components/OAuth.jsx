import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {FaGoogle} from 'react-icons/fa';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      console.log(data);
      navigate('/');

    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button type="button" onClick={handleGoogleClick} className="bg-teal-600 flex justify-center items-center gap-2 text-white border rounded-lg p-3 hover:opacity-85">
            <FaGoogle/>
            Continue with Google
    </button>
  );
}