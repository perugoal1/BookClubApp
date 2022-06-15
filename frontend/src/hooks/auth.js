import { useSelector } from 'react-redux';

function useUserStatus() {
    const auth = useSelector((state) => state.authReducer);

    return auth;
}

export default useUserStatus;
