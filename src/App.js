import React, { useState } from 'react';
import './App.css';
import { Button, Input, Box, EthAddress } from "rimble-ui";

function App() {
  // Status States
  const [status, setStatus] = useState("")
  const [statuskyc, setStatuskyc] = useState("")
  const [statusTopUp, setStatusTopUp] = useState("")

  // Wallet States
  const [walletAddress, setWalletAddress] = useState(null)
  const [balance, setBalance] = useState("0")
  const [topUpValue, setTopUpValue] = useState(0)

  // KYC States for sending
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [country, setCountry] = useState("")
  const [idPassport, setIdPassport] = useState("")

  
  // Make shuttle one wallet
  const makeWallet = () => {
    setStatus('Making wallet..')
    /*
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    */

    fetch("http://shuttleone.network:9007/api/szo/create")
      .then(response => response.text())
      .then(result => {
        setWalletAddress(result)
        setStatus("")
      })
      .catch(error => console.log('error', error));
  }

  // Get Balance
  const getBalance = () => {
    fetch("http://shuttleone.network:9007/api/szo/wallet/balance/" + walletAddress +"/PHP")
    .then(response => response.text())
    .then(result => {
      console.log(result)
      setBalance(result.slice(0, -2))
    })
    .catch(error => console.log('error', error));
    
  }

  // Do KYC
  const doKYC = () => {
    setStatuskyc("Adding KYC..")
    fetch("http://shuttleone.network:9007/api/szo/kyc_put/" + walletAddress + "/" + firstName + "/" + lastName + "/" + country + "/" + idPassport)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        setStatuskyc("KYC Successful")
      })
      .catch(error => console.log('error', error));
  }

  // Check if there's a KYC
  const checkKYC = ()  => {
    setStatuskyc("Checking KYC..")
    fetch("http://shuttleone.network:9007/api/szo/kyc_get/" + walletAddress )
    .then(response => response.text())
    .then(result => {
      if(result.kyc){
        console.log(result)
        setStatuskyc("KYC present")
      } else {
        setStatuskyc("No KYC")
      }
    })
    .catch(error => console.log('error', error));
  }

  // Top up money
  const topUp = () => {
    setStatusTopUp("Processing..")
    fetch("http://shuttleone.network:9007/api/szo/topup/" + walletAddress + "/" + topUpValue + "/PHP")
      .then(response => response.text())
      .then(result => {
        console.log(result)
        setStatusTopUp("success")
        getBalance()
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <h1> Shuttle One API Demo (PH Peso) </h1>
      <Box>
      <Box width={1/2} m="auto">
      <EthAddress address={walletAddress} textLabels />
      </Box>
      <h3>{status}</h3>
      </Box>

      <Box pb={5} >
        <Box pb={2}>
          Step 1: Create wallet
        </Box>
        <Box>
          <Button onClick={makeWallet}> Create wallet </Button>
        </Box>
      </Box>

      <Box pb={5}>
        Step 2: Add KYC
        <br />
        <h3>{statuskyc}</h3>
        <Box pb={3} pt={3}>
          <Input type="text" placeholder="First Name" onChange={(event) => {
            setFirstName(event.target.value)
          }} />
        </Box>
        <Box pb={3}>
          <Input type="text" placeholder="Last Name" onChange={(event) => {
            setLastName(event.target.value)
          }} />
        </Box>
        <Box pb={3}>
          <Input type="text" placeholder="Country" onChange={(event) => {
            setCountry(event.target.value)
          }} />
        </Box >
        <Box pb={3}>
          <Input type="text" placeholder="Id #" onChange={(event) => {
            setIdPassport(event.target.value)
          }} />
        </Box>
        <Box pb={2}>
        <Button onClick= {doKYC} >Add KYC</Button>
        </Box>
        <Box>
        <Button onClick= {checkKYC}>Check current address KYC</Button>
        </Box>
      </Box>

      <Box pb={4}>
        <Box>
          Step 3: Topup 
          <br /><br />
          Current Balance: PHP {balance}
          <h3> {statusTopUp} </h3>
       
        </Box>
        <Box pb={3}>
          <Input type="text" placeholder="Top up value" onChange={(event) => {
            setTopUpValue(event.target.value)
          }} />
        </Box>
        <Box pb={2}>
          <Button onClick={topUp}>Top up</Button>
        </Box>

        <Box >
          <Button onClick={getBalance}>Update Balance</Button>
        </Box>
      </Box>
    </div>
  );
}

export default App;       
