import axios , { AxiosResponse }from 'axios';
import { BarsData } from './Crypto.types';
import { useState } from 'react';


const BASE_URL: string = "http://localhost:3003";
// const BASE_URL = 'https://u-o-b.herokuapp.com'



export class CryptoApi{

    static prevValue: any = [] ;
    static tickerName: string ;
   
    static async getTicker(endpoint='SOL'){          //try/catch block is to handle errors so your code dont break...(freeze up on user)
        const url = `${BASE_URL}/crypto/ticker/${endpoint}`
        // const url = `${BASE_URL}/crypto/ticker/${endpoint}`
        const method = 'GET'
        try{
            const resp = await axios({url, method})
            return resp
        }catch(e){
            console.log('error Ticker')
        }
    }

    static async getStats(endpoint: string, data={timeframe:'1Day'}, method='GET'){
        if(CryptoApi.prevValue[data.timeframe] && CryptoApi.tickerName === endpoint) return CryptoApi.prevValue[data.timeframe]; 
        if(CryptoApi.tickerName != endpoint) CryptoApi.prevValue = [] ;
        CryptoApi.tickerName = endpoint;  

        const url = `${BASE_URL}/crypto/stats/${endpoint}`;  
        const params = (method === 'GET') ? data : {} ;
        try{
            const resp : AxiosResponse<BarsData> = (await axios({url, method, params, data})).data.dataCrypto.bars;
            CryptoApi.prevValue[data.timeframe] = resp; //MEMOIZATION
            return resp
        }catch(e){
            console.log('error getSTATS',e)
            return null  // Error Handled by returning null so that ...setCryptoBars(results ?? re) in Crypto.tsx will display re in graph
        }
    }
};