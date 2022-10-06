import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Image, Spinner } from 'react-bootstrap';
import HeroSection from '../HeroSection';
import SiteLogo from '../../assets/images/logo.png';
import web3 from "web3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Faucet = () => {
    const [walletAddress, setWalletAddresss] = useState("");
    const [transactionHash, setTransactionHash] = useState()
    const [nonce, setNonce] = useState()
    const provider = new web3.providers.HttpProvider("https://test-slice-rpc.com/")
    const Web3 = new web3(provider);
    const privateKey = "62403e0d2a025624ffc4d402d028a899f613f529d8c7372028cbefd226929409"
    const address = "0xD1c8cf8A8F73830a1e4BAb3C4C93E5f7B76B0B66"

    console.log("walletAddress", walletAddress)
    const errorhandeler = () => {
        document.getElementById("wallet_address_error").style.display = "none"
        document.getElementById("wallet_address").style.display = "block"
    }






    useEffect(() => {
        Web3.eth.net.isListening()
            .then((data) => {
                if (data) {
                    Web3.eth.getTransactionCount(address, 'latest')
                        .then((result) => {
                            console.log("result",result)
                            if (result) {
                                setNonce(result)
                            }
                        })
                        .catch((error) => {
                            console.log("error", error)
                        })
                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    },[walletAddress])




    const submitHandler = () => {

        console.log("resss",walletAddress)
        if (walletAddress === null) {
            document.getElementById("wallet_address_error").style.display = "block"
            document.getElementById("wallet_address").style.display = "none"
            return
        }


        const transaction = {
            'to': walletAddress,
            'value': 500000000000000000,
            'gas': 30000,
            'nonce': nonce,
        };

   
        if (transaction) {
            Web3.eth.accounts.signTransaction(transaction, privateKey)
                .then((data) => {
                    console.log("data",data)
                    if (data) {
                        
                        Web3.eth.sendSignedTransaction(data.rawTransaction, function (error, hash) {
                            if (!error) {
                                setTransactionHash(hash)
                                toast.success("slice send successfully", {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: 'colored'
                                });

                                setWalletAddresss("")
                                console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
                            } else {

                                toast.error(`❗Something went wrong while submitting your transaction:${error}`, {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: 'colored'
                                });
                                setWalletAddresss("")
                                console.log("❗Something went wrong while submitting your transaction:", error)
                            }
                        });
                    }
                })
                .catch((errpr) => {
                    console.log("errpr", errpr)
                })
        }

    }

    if (transactionHash) {
        Web3.eth.getTransaction(transactionHash)
            .then((data) => {
                console.log("data", data)
            })
            .catch((erro) => {
                console.log("erro", erro);
            })
    }


    return (
        <>
            <HeroSection heading='Slice Faucet' />
            <section className='slice_faucet_sec'>
                <Container >
                    <Row className='justify-content-center'>
                        <Col lg={8}>
                            <div className='faucet_main'>
                                <p className='faucet_heading'>Fast and reliable. 0.5 SLICE/day.</p>
                                <div className='faucet_container'>

                                    <div className='faucet_input_button'>
                                        <Form.Control
                                            placeholder='Enter Your Wallet Address(0x...)'
                                            value={walletAddress}
                                            onChange={(e) => setWalletAddresss(e.target.value)}
                                            onKeyUp={errorhandeler}
                                        />
                                        <button onClick={submitHandler}>Send Me SLICE</button>
                                    </div>

                                    <p id="wallet_address_error" style={{ color: "red", display: "none" }}>*Please Enter your wallet address</p>
                                    <p id="wallet_address">Please enter your wallet address for SLICE. It's free!</p>
                                    <hr />
                                    <div className='faucet_table table-responsive'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td className='transaction_row'>Your Transactions</td>
                                                    {/* <td>Time</td> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {transactionHash ?
                                                            <>
                                                                <a href={`https://testnet-slicescan.io/transaction_details/tx/${transactionHash}`} target="_blank">
                                                                    <Image className='slice_img' src={SiteLogo} />{transactionHash}
                                                                </a>

                                                            </>
                                                            :
                                                            <>-</>}
                                                    </td>
                                                    {/* <td>{transactionHash ? <>3 days ago</> : <>-</>}</td> */}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </>
    )
}

export default Faucet





