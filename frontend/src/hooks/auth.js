import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useUserStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    const auth = useSelector((state) => state.authReducer);

    return auth;
}

export default useUserStatus;
