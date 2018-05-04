import axios from 'axios';

export default {
    user: {
        login: credentials => 
            axios.post("/api/auth", {credentials}).then(res => res.data.user),
        register: user =>
            axios.post("/api/users", {user}).then(res => res.data.user),
        fetchCurrentUser: () =>
            axios.get("/api/users/current_user").then(res => res.data.user)
    },
    cryptos: {
        fetchAll: () => axios.get('/api/cryptos').then(res => res.data.cryptos),
        fetchBTC: () => axios.get('/api/cryptos/bitcoin-price').then(res => res.data.cryptos)
    }
}