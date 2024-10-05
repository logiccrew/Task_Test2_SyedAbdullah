


import { useContractRead, useDisconnect } from 'wagmi'
import { arbitrum } from '@wagmi/core/chains'
import { config } from "./wagmi"

import { mainabi } from "./mainabi";
import { useAccount, useConnect } from "wagmi";
import {
    getAccount,
    switchChain,
    writeContract,
    readContract
} from "@wagmi/core";
import { flare } from '@wagmi/core/chains'
import { waitForTransactionReceipt } from '@wagmi/core'
import { useEffect, useState } from "react";
import { parseUnits } from 'viem'
import './dailog.css';




const Users = () => {
    const { connectors, connect } = useConnect()
    const { chainId } = getAccount(config);
    const { disconnect } = useDisconnect()
    const [UserAddress, setUserAddress] = useState<any>();
    const [UserName, setUserName] = useState('');
    const [UserOTPSeed, setUserOTPS] = useState();
    const [UserOTP, setUserOTP] = useState();
    const { isConnected } = useAccount();
    const [investValue, setInvestValue] = useState<any>()

    const [finalHash, setFinalHash] = useState<any>()
    const [finalOTP, setFinalOTP] = useState<any>([])
    const [sender, setsender] = useState<any>()
    const [infoStatus, setinfo] = useState(false);

    console.log("Deposite Amount")
    const depositAmount = 3;
    const depositAmountS = "3"
    const username = "john"
    const id = 1
    console.log("TransactionID")

    const [submit, setSubmit] = useState(false);
    const [checkconnnection, setcheckconnection] = useState(false)
    const [approve, setApprove] = useState(true);

    const handleRegister = async () => {


        try {
            if (chainId != flare.id) {
                await switchChain(config, {
                    chainId: 42161,
                });

                setApprove(false)



                const requested = await writeContract(config, {
                    abi: mainabi,
                    address: '0x54dd08286Eb93Aa793e89b150227Ae10f2e0C250',
                    functionName: 'userRegestration',
                    args: [
                        UserAddress,
                        UserName,
                        //@ts-ignore
                        BigInt(UserOTPSeed),
                    ],

                })

                console.log(requested)

                if (!requested) {
                    console.log("no value");
                } else {
                    const result = await waitForTransactionReceipt(config, {
                        hash: requested,
                        pollingInterval: 1_000,
                    })
                    setInvestValue(result.status)
                    setFinalHash(result.transactionHash)
                    setsender(result.to)

                }




            } else {
                setApprove(false)

                const requested = await writeContract(config, {

                    abi: mainabi,
                    address: '0x54dd08286Eb93Aa793e89b150227Ae10f2e0C250',
                    functionName: 'userRegestration',
                    args: [
                        UserAddress,
                        UserName,
                        //@ts-ignore
                        BigInt(UserOTPSeed),
                    ],
                })

                console.log(requested)

                if (!requested) {
                    console.log("no value");
                } else {
                    const result = await waitForTransactionReceipt(config, {
                        hash: requested,
                        pollingInterval: 1_000,
                    })
                    setInvestValue(result.status)
                    setFinalHash(result.transactionHash)
                    setsender(result.to)
                    console.log(result.status)
                }


            }

        } catch (error) {

            console.error(error);
            if (error) {
                setApprove(true)
            }

        }
    }

    const handleAuthentication = async () => {


        try {
            if (chainId != flare.id) {
                await switchChain(config, {
                    chainId: 42161,
                });

                setApprove(false)



                const requested = await writeContract(config, {
                    abi: mainabi,
                    address: '0x54dd08286Eb93Aa793e89b150227Ae10f2e0C250',
                    functionName: 'AuthenticateUser',
                    args: [
                        UserAddress,
                        //@ts-ignore
                        BigInt(UserOTP),
                    ],

                })

                console.log(requested)

                if (!requested) {
                    console.log("no value");
                } else {
                    const result = await waitForTransactionReceipt(config, {
                        hash: requested,
                        pollingInterval: 1_000,
                    })
                    setInvestValue(result.status)
                    setFinalHash(result.transactionHash)
                    setsender(result.to)

                }




            } else {
                setApprove(false)

                const requested = await writeContract(config, {

                    abi: mainabi,
                    address: '0x54dd08286Eb93Aa793e89b150227Ae10f2e0C250',
                    functionName: 'AuthenticateUser',
                    args: [
                        UserAddress,
                        //@ts-ignore
                        BigInt(UserOTP),
                    ],

                })

                console.log(requested)

                if (!requested) {
                    console.log("no value");
                } else {
                    const result = await waitForTransactionReceipt(config, {
                        hash: requested,
                        pollingInterval: 1_000,
                    })
                    setInvestValue(result.status)
                    setFinalHash(result.transactionHash)
                    setsender(result.to)
                    console.log(result.status)
                }


            }

        } catch (error) {

            console.error(error);
            if (error) {
                setApprove(true)
            }

        }
    }

    const handleInfo = async () => {


        try {
            if (chainId != flare.id) {
                await switchChain(config, {
                    chainId: 42161,
                });

                setApprove(false)



                const requested = await readContract(config, {
                    abi: mainabi,
                    address: '0x54dd08286Eb93Aa793e89b150227Ae10f2e0C250',
                    functionName: 'userRegisterInfo',
                    args: [
                        UserAddress,
                    ],


                })

                console.log(requested)

                if (!requested) {
                    console.log("no value");
                } else {

                    setInvestValue("success")
                    setFinalOTP(requested[3])
                    setinfo(true)
                }




            } else {
                setApprove(false)

                const requested = await readContract(config, {
                    abi: mainabi,
                    address: '0x54dd08286Eb93Aa793e89b150227Ae10f2e0C250',
                    functionName: 'userRegisterInfo',
                    args: [
                        UserAddress,
                    ],


                })

                console.log(requested)

                if (!requested) {
                    console.log("no value");
                } else {
                    setInvestValue("success")
                    setinfo(true)
                    setFinalOTP(requested[3])
                }


            }

        } catch (error) {

            console.error(error);
            if (error) {
                setApprove(true)
            }

        }
    }


    const checkCancelDialog = async () => {

        setcheckconnection(true)
        setSubmit(false)
        setApprove(true)
    }


    const handleInputAddress = (event: any) => {
        setUserAddress(event.target.value); // Update the state with the new input value
    };


    const handleInputName = (event: any) => {
        setUserName(event.target.value); // Update the state with the new input value
    };
    const handleInputOTPS = (event: any) => {
        setUserOTPS(event.target.value); // Update the state with the new input value
    };

    const handleInputOTP = (event: any) => {
        setUserOTP(event.target.value); // Update the state with the new input value
    };

    return (
        <>

            {!isConnected && checkconnnection == false ?
                (

                    <div className="modal-overlay" style={{ background: "radial-gradient(#303c8f, #1d2456", height: "100%", width: "100%" }}>
                        <div className="modal " style={{ height: "100%" }}>

                            <div >



                                <div>
                                    <div >

                                        <div className='' style={{ color: "#539feb", paddingLeft: "20px", paddingBottom: "2%", paddingTop: "2%" }}><h2>Connect</h2></div>

                                    </div>
                                    <div className='col-12' style={{ paddingBottom: "2%", paddingLeft: "25px", paddingRight: "25px" }}>
                                        <div className='col-12' >
                                            <div style={{ paddingBottom: "3%" }}>
                                                {connectors.map((connector) => (

                                                    <div style={{ paddingBottom: "8px" }}><button
                                                        className="Wallet-button3"
                                                        key={connector.uid}
                                                        onClick={() => connect({ connector })}
                                                        type="button"

                                                    >
                                                        {connector.name}

                                                    </button>
                                                    </div>
                                                ))}


                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6' style={{ paddingBottom: "5px", paddingLeft: "20px", paddingRight: "5px", color: "grey", fontSize: "13px" }}>First time setting up a wallet?</div>
                                </div>



                            </div>

                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="modal-overlay" style={{ background: "radial-gradient(#303c8f, #1d2456", height: "100%" }}>

                            <div className="modal" style={{ alignItems: "center", height: "100%" }}>



                                {
                                    approve == true ?
                                        (
                                            <div>
                                                <div className=" col-12" style={{ display: "flex" }} >
                                                    <div>
                                                        <button className='close-button ' style={{ paddingTop: "5%", paddingRight: "25px" }} onClick={() => disconnect()}>Disconnect</button>
                                                    </div>
                                                    <div className="col-xs-2 col-sm-3 col-md-4 col-lg-6" style={{ paddingLeft: "15px", paddingRight: "20%", paddingTop: "10px", paddingBottom: "10px" }} >
                                                        <h3>Registration</h3>
                                                        <div>User Registration on Blockchain. </div>
                                                    </div>




                                                </div>
                                                <div style={{ paddingBottom: "0.5%", paddingLeft: "20px", paddingRight: "25px", justifyContent: "center" }}>


                                                    <div>User Address</div>
                                                    <div style={{ padding: "5px" }}>
                                                        <input
                                                            className="inputFiled"
                                                            id="myInput"
                                                            type="text"
                                                            value={UserAddress}
                                                            onChange={handleInputAddress} // Update state on change
                                                        />
                                                    </div>
                                                    <div>UserName</div>
                                                    <div style={{ padding: "5px" }}>
                                                        <input
                                                            className="inputFiled"
                                                            id="myInput"
                                                            type="text"
                                                            value={UserName}
                                                            onChange={handleInputName} // Update state on change
                                                        />
                                                    </div>
                                                    <div>User Authentication Seed</div>
                                                    <div style={{ fontSize: "small", paddingTop: "10px" }}>It should be any number..</div>
                                                    <div style={{ padding: "5px" }}>
                                                        <input
                                                            className="inputFiled"
                                                            id="myInput"
                                                            type="text"
                                                            value={UserOTPSeed}
                                                            onChange={handleInputOTPS} // Update state on change
                                                        />
                                                    </div>
                                                    <div  >


                                                        <div>




                                                            <div style={{ paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px" }} >
                                                                <button className=' Wallet-button4' onClick={handleRegister}>Confirm</button>
                                                            </div>




                                                        </div>

                                                    </div>

                                                </div>
                                                <div className=" col-12" style={{ display: "flex" }} >

                                                    <div className="col-xs-2 col-sm-3 col-md-4 col-lg-6" style={{ paddingLeft: "15px", paddingRight: "20%", paddingTop: "10px", paddingBottom: "10px" }} >
                                                        <h3>Usre Authentication</h3>
                                                        <div>Authenticate Your User on the Blockchain.</div>
                                                    </div>




                                                </div>
                                                <div style={{ paddingBottom: "2%", paddingLeft: "20px", paddingRight: "25px", justifyContent: "center" }}>


                                                    <div>User Address</div>
                                                    <div style={{ padding: "5px" }}>
                                                        <input
                                                            className="inputFiled"
                                                            id="myInput"
                                                            type="text"
                                                            value={UserAddress}
                                                            onChange={handleInputAddress} // Update state on change
                                                        />
                                                    </div>
                                                    <div>Authentication Code</div>
                                                    <div style={{ padding: "5px" }}>
                                                        <input
                                                            className="inputFiled"
                                                            id="myInput"
                                                            type="text"
                                                            value={UserOTP}
                                                            onChange={handleInputOTP} // Update state on change
                                                        />
                                                    </div>
                                                    <div  >


                                                        <div>




                                                            <div style={{ paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px" }} >
                                                                <button className=' Wallet-button4' onClick={handleAuthentication}>Submit</button>
                                                            </div>




                                                        </div>

                                                    </div>

                                                </div>
                                                <div className=" col-12" style={{ display: "flex" }} >

                                                    <div className="col-xs-2 col-sm-3 col-md-4 col-lg-6" style={{ paddingLeft: "15px", paddingRight: "20%", paddingTop: "10px", paddingBottom: "10px" }} >
                                                        <h3>User Information</h3>
                                                        <div>Get User Information through User Address.</div>
                                                    </div>




                                                </div>
                                                <div style={{ paddingBottom: "2%", paddingLeft: "20px", paddingRight: "25px", justifyContent: "center" }}>



                                                    <div style={{ padding: "5px" }}>
                                                        <input
                                                            className="inputFiled"
                                                            id="myInput"
                                                            type="text"
                                                            value={UserAddress}
                                                            onChange={handleInputAddress} // Update state on change
                                                        />
                                                    </div>
                                                    <div  >


                                                        <div>




                                                            <div style={{ paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px" }} >
                                                                <button className=' Wallet-button4' onClick={handleInfo}>Get Information</button>
                                                            </div>




                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        ) : (
                                            (investValue == "success" ?
                                                (
                                                    <div className=" col-12" >
                                                        <div className="col-xs-2 col-sm-3 col-md-4 col-lg-6" style={{ paddingLeft: "15px", paddingRight: "20%", paddingTop: "10px", paddingBottom: "10px" }} >
                                                            <h2>Successfull</h2>
                                                            <div>Your Transaction has been successfully listed on blockchain for furthur details please check the transaction on your wallet.</div>
                                                        </div>
                                                        {
                                                            infoStatus == true ?
                                                                (
                                                                    <div></div>
                                                                ) : (
                                                                    <div></div>
                                                                )
                                                        }
                                                    </div>
                                                )

                                                :
                                                ((investValue == "reverted" ? (
                                                    <div >
                                                        <div style={{ color: "red" }}>Warning</div>
                                                        <p>Your Transaction has been reverted.</p>
                                                    </div>
                                                ) : (<div className="loader-container">
                                                    <div className="loader"></div>
                                                    <p>Loading...</p>
                                                </div>))
                                                ))
                                        )


                                }




                            </div>


                        </div>


                    </div>


                )

            }


        </>
    );
};
export default Users