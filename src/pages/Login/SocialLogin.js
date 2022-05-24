import React from 'react';
import googleIcon from '../../images/icons/google.png';
import facebookIcon from '../../images/icons/facebook.png';
const SocialLogin = ({ handleGoogleLogin, handleFacebookLogin }) => {

    return (
        <>
            {/* divider  */}
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">OR</div>
            </div>
            {/* Social login btn  */}
            <div className='flex justify-evenly'>
                <div onClick={handleGoogleLogin} className='p-3 rounded bg-gray-400 cursor-pointer'>
                    <img src={googleIcon} className="w-[50px]" alt="" />
                </div>
                <div onClick={handleFacebookLogin} className='p-3 rounded bg-gray-400 cursor-pointer'>
                    <img src={facebookIcon} className="w-[50px]" alt="" />
                </div>
            </div>
        </>
    );
};

export default SocialLogin;