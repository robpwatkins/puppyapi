import React, { useState, useEffect } from 'react';
import Fetcher from './Fetcher';
import Login from './Login';
import Adder from './Adder';
import SubmitPup from './SubmitPup';
import FabNav from './FabNav';
import { checkAuth } from '../checkAuth';

const Landing = props => {
  const [pups, setPups] = useState();
  const [fetcherActive, setFetcherActive] = useState(false);
  const [adderActive, setAdderActive] = useState(false);

  useEffect(() => {
    props.setPupsActive(pupsActive => pupsActive = true);
    props.setLoginActive(false);
  }, []);
  
  const getPups = async () => {
    const response = await fetch('/pups');
    const body = await response.json();
    
    if (response.status !== 200) {
      throw Error(body.message);
    }
    setPups(body.reverse());
  }

  useEffect(() => {
    getPups();
  }, [])
  // console.log(props.loginActive);
  return (
    <div className="landing-container">
      <div className="landing">
        <FabNav setLoginActive={props.setLoginActive} />
        {props.pupsActive && !adderActive &&
          <Fetcher 
            fetcherActive={fetcherActive}
            setFetcherActive={setFetcherActive} 
          />}
        {(props.loginActive || adderActive) &&
        <div className="modal-background">
          {props.loginActive &&
            <Login 
              setLoginActive={props.setLoginActive} 
              setPupsActive={props.setPupsActive}
            />}
          {adderActive && <SubmitPup setAdderActive={setAdderActive} />}
        </div>}
        <div className="pups">
          {checkAuth() && <Adder setAdderActive={setAdderActive} />}
          {pups &&
            pups.map(pup => {
              return (
                <img src={pup.img_url} key={pup.pups_id} alt="" />
              )
            })
          }
          {/* {pups &&
            pups.map(pup => {
              return (
                <img src={pup.img_url} key={pup.pups_id} alt="" />
              )
            })
          } */}
        </div>
      </div>
    </div>
  )
}

export default Landing;