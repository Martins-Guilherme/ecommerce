import { FunctionComponent, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Pages
import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import SignUpPage from './pages/sign-up/sign-up.page';
import CheckoutPage from './pages/checkout/checkout';
import NotFoundPage from './pages/not-found/not-found.page';
import PaymentConfirmationPage from './pages/payment-confirmation/payment-confirmation.page';
import ExplorePage from './pages/explorer/explorer.page';
import CategoryDetailsPage from './pages/category-details/category-details.page';

// firebase config
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './config/firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Utilities
import { userConverter } from './converters/firebase.converters';
import AuthenticationGuard from './components/guards/authentication.guards';
import { loginUser, logoutUser } from './store/toolkit/user/user.slice';
import { useAppSelector } from './hooks/redux.hooks';

// Components
import Loading from './components/loading/loading.component';
import Cart from './components/cart/cart.components';

const App: FunctionComponent = () => {
  const [isInitialized, setIsInitialized] = useState(true);

  const dispatch = useDispatch();

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer,
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigningOut = isAuthenticated && !user;

      if (isSigningOut) {
        dispatch(logoutUser() as any);
        return setIsInitialized(false);
      }

      const isSigingIn = !isAuthenticated && user;
      if (isSigingIn) {
        const querySnapshot = await getDocs(
          query(
            collection(db, 'users').withConverter(userConverter),
            where('id', '==', user.uid),
          ),
        );
        const userFromFireStore = querySnapshot.docs[0]?.data();

        dispatch(loginUser(userFromFireStore) as any);
        return setIsInitialized(false);
      }
      return setIsInitialized(false);
    });
  }, [dispatch]);

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
