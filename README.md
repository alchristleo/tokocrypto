This is the client side/front-end of Tokocrpto created using ReactJS, and redux. For the server side/back-end code you can find it [here](https://github.com/alchristleo/tc-api)

## Table of Contents
1. Authentication page (Login, Register, Forgot password, Reset password, Email confirmation)
2. Dashboard page
3. Market page
4. Transaction history page

## Feature
1. Login and register authentication using jwt
2. Email verification after register
3. Reset password on forgot password page using token
4. Dashboard page contains list of Cryptos using conimarketcap api 
5. Navbar containing user balance and cryptos asset + BTC small chart
6. Sorting based on table header
7. Market for buying and selling crypto including current crypto price chart in 30 days.
8. Updated user balance/crypto-balance every transaction created & current asset value based on currency value
9. User transaction history
10. Notification (COMING SOON)
11. Edit profile image using cloudinary (COMING SOON)

## How to run this project?
```
git clone https://github.com/alchristleo/tokocrypto.git
cd tokocrypto
yarn install
```
### Before run the project you need to start the server first [here](https://github.com/alchristleo/tc-api), after start then: 
```
yarn start
open http://localhost:3000
```

## Eslint setup
eslint
eslint-config-airbnb
eslint-config-prettier
eslint-plugin-import
eslint-plugin-jsx-a11y
eslint-plugin-prettier
eslint-plugin-react
prettier

