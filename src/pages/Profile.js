import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  const redirectTo = (endpoint) => {
    history.push(endpoint);
  };

  const userLogout = () => {
    localStorage.clear();
    redirectTo('/');
  };

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (userLocalStorage) {
      setUserEmail(userLocalStorage.email);
    }
  }, []);

  return (
    <section
      className="page-profile"
    >
      <Header
        title="Profile"
      />
      <p
        data-testid="profile-email"
      >
        { userEmail }
      </p>

      <Button
        id="profile-done-btn"
        text="Done Recipes"
        onClick={ () => redirectTo('/done-recipes') }
      />

      <Button
        id="profile-favorite-btn"
        text="Favorite Recipes"
        onClick={ () => redirectTo('/favorite-recipes') }
      />

      <Button
        id="profile-logout-btn"
        text="Logout"
        onClick={ userLogout }
      />

      <Footer />
    </section>
  );
}

export default Profile;
