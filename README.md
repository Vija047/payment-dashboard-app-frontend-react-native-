#  Payment Dashboard App — Frontend (React Native)

This is the **mobile-first Payment Management Dashboard** built with **React Native** (using Expo).  
It connects to the NestJS backend to manage payments securely with JWT-based authentication.

---

##  **Features**

 Secure login with JWT  
 Store token securely (`expo-secure-store`)  
 Dashboard with key payment metrics  
 Interactive line chart for revenue trends  
 Paginated & filterable transactions list  
 Add new simulated payment  
 Smooth navigation between screens

---

##  **Tech Stack**

- React Native (Expo)
- React Navigation
- Axios or Fetch for API calls
- `expo-secure-store` for JWT
- `react-native-chart-kit` for charts
- TypeScript (recommended)

---

##  **Folder Structure**

```

/src
├── screens/
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── TransactionListScreen.tsx
│   ├── TransactionDetailsScreen.tsx
│   └── AddPaymentScreen.tsx
├── services/
│   └── api.ts
├── components/
│   └── TransactionCard.tsx
├── utils/
│   └── auth.ts

````

---

##  **Getting Started**

###  1. Clone the repo

```bash
git clone https://github.com/yourusername/payment-dashboard-frontend.git
cd payment-dashboard-frontend
````

###  2. Install dependencies

```bash
npm install
# or
yarn install
```

###  3. Add `.env`

Create a `.env` file in the root and set your backend URL:

```
API_URL=http://<YOUR_BACKEND_URL>:3000
```

Update `api.ts` to use `API_URL`.

---

### 4. Start the app

Run the Expo server:

```bash
npm start
# or
yarn start
```

Scan the QR code with Expo Go or run on an emulator.

---

##  **Authentication**

* Uses `/auth/login` endpoint.
* JWT stored securely with `expo-secure-store`.
* Token is attached to all authenticated requests.

---

##  **Charts**

Revenue trends are visualized with `react-native-chart-kit`.

---

##  **Sample Credentials**

| Username | Password   |
| -------- | ---------- |
| `admin`  | `password` |

---

## **Screens**

| Login                                  | Dashboard                               | Transactions                                      | Add Payment                                |
| -------------------------------------- | --------------------------------------- | ------------------------------------------------- | ------------------------------------------ |
| ![Login Screen](screenshots/login.png) | ![Dashboard](screenshots/dashboard.png) | ![Transaction List](screenshots/transactions.png) | ![Add Payment](screenshots/addpayment.png) |

*(Replace with your actual screenshots)*

---

## 📌 **API Endpoints Used**

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| `POST` | `/auth/login`     | Log in, receive JWT            |
| `GET`  | `/payments/stats` | Fetch dashboard metrics        |
| `GET`  | `/payments`       | List transactions with filters |
| `POST` | `/payments`       | Add new payment                |
| `GET`  | `/payments/:id`   | Get payment details            |

---

## 📌 **Tips**

* Change `API_URL` to your local or deployed backend.
* Make sure your backend CORS is configured properly.

---

##  **Author**

Built with  by [Your Name](https://github.com/yourusername)

---

##  **License**

This project is licensed under the MIT License.

```

---

 **Next steps:**  
- Replace `yourusername` with your GitHub username  
- Add real screenshots to `/screenshots` folder  
- Update your `api.ts` to use `API_URL` from `.env`  
- Commit and push to your `client` repo  

If you’d like, I can prepare the **backend `README.md`** or the actual `api.ts` boilerplate too — just say **“Yes, next!”** 
