import { useState, useEffect} from 'react';
import { io } from 'socket.io-client';
import { CryptoApi } from './api';
import { CryptoForm } from './CryptoForm';
import { Calculations } from './Calculations';
import {re, ini} from './StarterCode'
import { Graph } from './Graph';
import './styles/Crypto.css'

export const Crypto = () => {

  const [cryptoData, setCryptoData] = useState('')
  const [cryptoName, setCryptoName] = useState('')
  const [cryptoBars, setCryptoBars] = useState(re)
  const [convertedBars, setConvertedBars] = useState(ini)

  
  let socket;
  useEffect(() =>{

      // socket = io.connect('http://localhost:3003')
      socket = io.connect('https://u-o-b.herokuapp.com')

      socket.on("meta", (data)=>{
          let result = JSON.parse(data)
          // console.log(result)
          setCryptoData(result[0])
      })
      socket.connect()
      },[cryptoName])
  
  useEffect(()=>{
    async function getData(){

        try{
          const results = await CryptoApi.getTicker(cryptoName)
        }catch(e){
            console.log(e)
        }


        try{
          const results = await CryptoApi.getStats(cryptoName)
          setCryptoBars(results.data.data.bars)
          // console.log(results)
        }catch(e){
          console.log(e)
        }
    }
    getData()
  },[cryptoName])


  useEffect(()=>{
    const results = Calculations.calculate(cryptoBars)
    // console.log(results, 'converted bars')
    setConvertedBars(results)
  }, [cryptoBars])

// onClick async functions dont need useffect
  const getCryptoCharts = async time => {
    let t = {timeframe: time}
    console.log(cryptoName, t)

    const results = await CryptoApi.getStats(cryptoName, t)
    // console.log(results, 'results in Crypto.js')
    setCryptoBars(results.data.data.bars)
  }

  const getCryptoName = (data) => {
    setCryptoName(data)
  }
    
      
    
    return (
      
      <div className='crypto-body'>
        <div className='crypto-data'>
          <CryptoForm getCryptoName={getCryptoName}/>
          <p className='crypto-name'>{cryptoName}</p>
          <div className='price-container'>
              <p className='crypto-price'>{cryptoData.bp}</p>
          </div> 
          <Graph crypto={convertedBars} timeFunc={getCryptoCharts}/>      
        </div> 
        <div className='amount-container'>
            <p className='crypto-amount'>{cryptoData.bs}</p>
        </div>
      </div>
    )
}
