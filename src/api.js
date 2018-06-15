import axios from 'axios';

export default {
    user: {
        login: credentials =>
            axios.post("/api/auth", { credentials }).then(res => res.data.user),
        register: user =>
            axios.post("/api/users", { user }).then(res => res.data.user),
        fetchCurrentUser: () =>
            axios.get("/api/users/current_user").then(res => res.data.user),
        confirm: token =>
            axios.post("/api/auth/confirmation", { token }).then(res => res.data.user),
        forgot_password: credentials =>
            axios.post("/api/auth/forgot_password", { credentials }).then(res => res.data.user),
        validate_token: token =>
            axios.post("/api/auth/validate_token", { token }),
        reset_password: data =>
            axios.post("/api/auth/reset_password", { data })
    },
    cryptos: {
        fetchAll: () => axios.get('/api/cryptos').then(res => res.data.cryptos),
        fetchBTC: () => axios.get('/api/cryptos/bitcoin-price').then(res => res.data.cryptos),
        fetchCurrent: () => axios.get('/api/cryptos/current-crypto').then(res => res.data.cryptos),
        create: crypto => axios.post('/api/cryptos', { crypto }).then(res => res.data.crypto),
        fetchKurs: () => axios.get('/api/cryptos/kurs').then(res => res.data.kurs)
    },
    transactions: {
        fetchAll: () => axios.get('/api/transactions').then(res => res.data.transactions),
        create: transaction => axios.post('/api/transactions', { transaction }).then(res => res.data.transaction)
    },
}