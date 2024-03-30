import React from 'react';
import './Landing.css'
import Human from '../../assets/human.png'
import illustration1 from '../../assets/illustration1.png'
import illustration2 from '../../assets/illustration2.png'
import { TypeAnimation } from 'react-type-animation';
import useGetAddressFromName from '../../hooks/useGetAddressFromName'
import {
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";

import FormComponent from '../../component/FormComponent';

const Landing= ()=>{
  const { chainId } = useWeb3ModalAccount();
  const ensName = useGetAddressFromName()

  return(
    <div className="signupparent">

    <div className="signupdesign1">
    <img src={illustration1}/>
    </div>

    <div className="signupdesign2">
    <img src={illustration2}/>
    </div>


    <div className="signupwrapper">
    <div className="signupillustration">
    <img src={Human} className="signupimage"/>
    </div>

    <div className="signupcontent">
      {chainId? <div className='signform'>
                  <FormComponent />
                </div> 
                      :
                <div>
                  <TypeAnimation
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      'Welcome to JatGon, Where Conversations Flow Beyond Borders',
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      'Experience Privacy and Freedom in Every Message with JatGon.',
                      1000,
                      'Embrace The Power of Decentralization',
                      1000,
                      'Embrace The Power of Unlocking Trust',
                      1000,
                      'Embrace The Power of Security',
                      1000,
                      "Click on 'Connect Wallet' to get started.",
                      5000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '4.5em', display: 'inline-block', color: 'white' }}
                    repeat={Infinity}
                  />
                </div>
              }
      </div>
    </div>

    </div>
)
};

export default Landing;
