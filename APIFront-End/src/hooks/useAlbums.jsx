import { useEffect, useState } from "react";

const useUser = ({ loginInfo }) => {
    const [data, setData] = useState(null);
    const URL = "https://localhost:7051/users/login";
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        
            setLoading(true)
            fetch(`${URL}?${loginInfo.toString()}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(json =>{
                setLoading(false)
                setData(json)
            })
            .catch(error =>{
                setData(null)
                setError(error)
            })

    }, [loginInfo]);

    return [data, loading, error]

}

export default useUser