import { FunctionComponent, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import SignUpPage from './pages/sign-up/sign-up.page';

// firebase config
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './config/firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { UserContext } from './contexts/user.context';
import { userConverter } from './converters/firebase.converters';
import Loading from './components/loading/loading.component';
import ExplorePage from './pages/explorer/explorer.page';
import CategoryDetailsPage from './pages/category-details/category-details.page';
import NotFoundPage from './pages/not-found/not-found.page';
import Cart from './components/cart/cart.components';
import CheckoutPage from './pages/checkout/checkout';
import AuthenticationGuard from './components/guards/authentication.guards';
import PaymentConfirmationPage from './pages/payment-confirmation/payment-confirmation.page';

const App: FunctionComponent = () => {
  const [isInitialized, setIsInitialized] = useState(true);

  const { isAuthenticated, logOutUser, loginUser } = useContext(UserContext);

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user;

    if (isSigningOut) {
      logOutUser();
      return setIsInitialized(false);
    }

    const isSigingIn = !isAuthenticated && user;
    if (isSigingIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'users').withConverter(userConverter),
          where('id', '==', user?.uid),
        ),
      );
      const userFromFireStore = querySnapshot.docs[0]?.data();

      loginUser(userFromFireStore);
      return setIsInitialized(false);
    }
    return setIsInitialized(false);
  });
  if (isInitialized) return <Loading />;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/explorer" element={<ExplorePage />} />
          <Route path="/category/:id" element={<CategoryDetailsPage />} />
          <Route
            path="/payment-confirmation"
            element={<PaymentConfirmationPage />}
          />
          <Route
            path="/checkout"
            element={
              <AuthenticationGuard>
                <CheckoutPage />
              </AuthenticationGuard>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Cart />
      </BrowserRouter>
    </>
  );
};

export default App;
