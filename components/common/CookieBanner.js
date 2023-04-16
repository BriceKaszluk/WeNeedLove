import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieBanner = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAnalyticsChecked, setIsAnalyticsChecked] = useState(true);
  const [isAdvertisingChecked, setIsAdvertisingChecked] = useState(false);

  useEffect(() => {
    if (Cookies.get('cookie_accepted')) {
      setIsAccepted(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookie_accepted', true, { expires: 365 });
    setIsAccepted(true);
  };

  const customizeCookies = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (isAccepted) {
    return null;
  }

  return (
    <>
      {!isAccepted && (
        <div className="fixed bottom-4 left-0 md:left-4 z-50 bg-white text-gray-800 p-4 rounded-md border-2 border-gray-800 md:w-2/6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm mr-2 mb-2 md:mb-0">Nous utilisons des cookies pour améliorer votre expérience de navigation sur notre site. <a href="/policy" className="underline">Politique de confidentialité</a></p>
            <div className="flex items-end justify-end w-full md:w-fit my-4">
              <button className="bg-white text-gray-800 py-2 px-4 rounded-md text-sm md:text-base border border-gray-800 mr-2" onClick={customizeCookies}>Personnaliser</button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md text-sm md:text-base" onClick={acceptCookies} disabled={!isAnalyticsChecked} style={{ cursor: isAnalyticsChecked ? 'pointer' : 'not-allowed' }}>Accepter</button>
            </div>
          </div>
          <div className={`${showModal ? '' : 'hidden'}`}>
            <h2 className="text-lg font-bold mb-2">Gestion des cookies</h2>
            <p className="mb-4">Choisissez les types de cookies que vous souhaitez accepter :</p>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="analytics_cookies">
                Cookies de mesure d&apos;audience
              </label>
              <div className='flex items-start justify-start'>
              <input className="mr-2 h-6" type="checkbox" id="analytics_cookies" name="analytics_cookies" defaultChecked={true} onChange={() => setIsAnalyticsChecked(!isAnalyticsChecked)} />
              <label className="text-sm" htmlFor="analytics_cookies">
                Nous utilisons ces cookies pour suivre l&apos;utilisation de notre site et améliorer les performances et la conception de notre site.
              </label>
              </div>

            </div>
            <div className="mb-2">
              <label className="block font-bold mb-2" htmlFor="advertising_cookies">
                Cookies publicitaires
              </label>
              <div className='flex items-start justify-start'>
              <input className="mr-2 h-6" type="checkbox" id="advertising_cookies" name="advertising_cookies" defaultChecked={true} onChange={() => setIsAdvertisingChecked(!isAdvertisingChecked)} />
              <label className="text-sm" htmlFor="advertising_cookies">
                Nous utilisons ces cookies pour vous présenter des publicités ciblées en fonction de vos centres d&apos;intérêt.
              </label>
              </div>
 
            </div>
            <div className="flex justify-end mb-4">
              <button className="bg-white text-gray-800 py-2 px-4 rounded-md text-sm md:text-base border border-gray-800 mr-2" onClick={handleCloseModal}>Fermer</button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md text-sm md:text-base" onClick={acceptCookies} disabled={!isAnalyticsChecked} style={{ cursor: isAnalyticsChecked ? 'pointer' : 'not-allowed' }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}  

export default CookieBanner;
