import axios , { AxiosResponse }from 'axios'
import { BarsData } from './Crypto.types';



const BASE_URL = "http://localhost:3003";
// const BASE_URL = 'https://u-o-b.herokuapp.com'



export class CryptoApi{
    //try/catch block is to handle errors so your code dont break...(freeze up on user)
    static async getTicker(endpoint='SOL'){
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
        const url = `${BASE_URL}/crypto/stats/${endpoint}`;  
        const params = (method === 'GET') ? data : {} ;
        try{
            const resp : AxiosResponse<BarsData> = (await axios({url, method, params, data})).data.dataCrypto.bars;
            return resp
        }catch(e){
            console.log('error getSTATS',e)
            return null
        }
    }
};