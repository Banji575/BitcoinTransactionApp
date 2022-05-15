import btc from 'bitcoinjs-lib';
import fetch from 'node-fetch';
//alicePublic mg34UcozQEw6HRSxUnzxsVoC6xsGSaKj82
//alicePrivate cUYyTwussGNzPUDfaQLMbuoZ9HemJse63CYEQsCVesP355Jeqh6G

//bobPrivate cPBjZ8SjmjBonVKNsVamtSnBgD3t2VEmtwVV2MbvuyGBBZTDmtmx
//bobPublic mpKdgLJn5Jsy6exMphmVbuV5SjiENY2TZF

// set network for the bitcoinjs library
// documentation - https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/addresses.js#L121
var network = btc.networks.testnet;

// set endpoint for block explorer public API
var blockExplorerTestnetApiEndpoint = 'https://testnet.bitcoinexplorer.org/api/';

// generate two bitcoin addresses using the bitcoinjs library
var getKeys = function () {
    var aliceKeys = btc.ECPair.makeRandom({
        network: network
    });
    var bobKeys = btc.ECPair.makeRandom({
        network: network
    });

    var alicePublic = aliceKeys.getAddress();
    var alicePrivate = aliceKeys.toWIF();

    var bobPublic = bobKeys.getAddress();
    var bobPrivate = bobKeys.toWIF();

    // console.log(alicePublic, alicePrivate, bobPublic, bobPrivate);
    console.log('bobPublic', bobPublic)
    console.log('bobPrivate', bobPrivate)

    console.log('alicePublic', alicePublic)
    console.log('alicePrivate', alicePrivate)
};

const getOutput = function(){
    const url = blockExplorerTestnetApiEndpoint + 'address/' + 'mpKdgLJn5Jsy6exMphmVbuV5SjiENY2TZF?limit' 

    fetch(url)
    .then(data => data.json())
    .then(utxo=>{
        const transaction = new btc.TransactionBuilder(network)
        const txid = utxo.txHistory.txids[0]
        const vout = utxo.txHistory.blockHeightsByTxid[txid]
        
        transaction.addInput(txid, vout)
        transaction.addOutput(alicePublic, 500)
        transaction.addOutput(bobPublic, 2000)
    })

}

getOutput()