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
        query(collection(db, 'users'), where('id', '==', user?.uid)),
      );
      const userFromFireStore = querySnapshot.docs[0]?.data();

      loginUser(userFromFireStore as any);
      return setIsInitialized(false);
    }
    return setIsInitialized(false);
  });
  if (isInitialized) return null;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
