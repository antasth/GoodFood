import { AiOutlineHome, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { ProfileInfo } from '../ProfileInfo/ProfileInfo';
import styles from './ProfileContent.module.scss';
import { getCustomerData } from '../../../../api/requests';
import { Loader } from '../../../../components/Loader';

// eslint-disable-next-line max-lines-per-function
export function ProfileContent(): React.ReactElement {
  const [activeArticle, setActiveArticle] = useState('account');
  const [userData, setUserData] = useState<Customer>();
  const [isLoading, setIsLoading] = useState(true);

  const handleButtonAccount = (): void => {
    setActiveArticle('account');
  };

  const handleButtonPassword = (): void => {
    setActiveArticle('password');
  };

  const handleButtonAddresses = (): void => {
    setActiveArticle('addresses');
  };

  useEffect(() => {
    getCustomerData().then(
      (result) => {
        setUserData(result.body);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.article}>
        <div>
          <div className={styles.image} />
          {!isLoading ? (
            <h3
              className={styles.title}
            >{`${userData?.firstName} ${userData?.lastName}`}</h3>
          ) : (
            <Loader />
          )}
        </div>
        <div className={styles.buttons_container}>
          <button
            className={styles.button}
            type="button"
            onClick={handleButtonAccount}
          >
            <AiOutlineUser className={styles.icon} />
            Account
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleButtonPassword}
          >
            <AiOutlineLock className={styles.icon} />
            Password
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleButtonAddresses}
          >
            <AiOutlineHome className={styles.icon} />
            Addresses
          </button>
        </div>
      </div>
      {userData && (
        <ProfileInfo
          activeArticle={activeArticle}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </main>
  );
}
