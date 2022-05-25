import { useEffect, useState } from "react"

const useToken = (user) => {
    const [token, setToken] = useState('');
    const email = user?.user?.email;
    const name = user?.user?.displayName;
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/user/${email}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email, name })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        setToken(localStorage.getItem('accessToken'))
                    }
                })
        }

    }, [user])
    return token;
}
export default useToken;