// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Contract for user registration and OTP-based authentication
contract Test2 {
    
    // Variable to store the OTP expiration timestamp
    uint256 private otpTimeValid;

    // Mapping to check if a user already has a specific username (address -> (username -> bool))
    mapping(address => mapping(string => bool)) private userNames;

    // Mapping to store user information (address -> userInfo)
    mapping(address => userInfo) public userRegisterInfo;

    // Mapping to track if an OTP has been used (address -> (OTP -> bool))
    mapping(address => mapping(uint256 => bool)) private AthenticationCode;

    // Event emitted when authentication is successful
    event AuthenticationSuccess(
        address indexed userAddress,  // Address of the authenticated user
        address indexed authenticatedBy  // Address of the entity who authenticated the user
    );

    // Struct to hold user information such as address, username, OTP seed, OTP, and status
    struct userInfo {
        address userAddress;  // User's Ethereum address
        string UserName;      // User's chosen username
        uint256 OtpSeed;      // OTP seed used for generating OTP
        uint256 Otp;          // Generated OTP
        bool Status;          // Status indicating if the user is registered and active
    }

    // Temporary userInfo variable for internal use (this variable is not really necessary as `userRegister` already stores data)
    userInfo Users;

    // Function to register a new user with a specific address, username, and OTP seed
    function userRegestration(
        address _userAddress,  // Ethereum address of the user
        string memory _userName, // Username chosen by the user
        uint256 Otpseed         // OTP seed to generate OTP
    ) public {
        // Ensure the username has not been taken by another user
        require(
            !userNames[_userAddress][_userName],
            "UserName has already been taken."
        );

        // Ensure the user address is not a zero address (invalid address)
        require(_userAddress != address(0));

        // Ensure the sender address is not zero address
        require(msg.sender != address(0));

        // Ensure the OTP seed is valid (not zero)
        require(Otpseed != 0, "Your OTP is not valid.");

        // Generate the OTP using the provided seed
        uint256 result = OTPgenration(Otpseed);

        // Register the user with their address and the generated information
        userRegisterInfo[_userAddress] = userInfo({
            userAddress: _userAddress,
            UserName: _userName,
            OtpSeed: Otpseed,
            Otp: result,
            Status: true  // Mark the user as active
        });

        // Mark the username as taken for this address
        userNames[_userAddress][_userName] = true;
    }

    // Function to generate an OTP based on a given seed
    function OTPgenration(uint256 OtpSeed) internal returns (uint256) {
        // Generate a hash using various block parameters and the OTP seed
        uint256 OTPs = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,        // Current block timestamp
                    block.prevrandao,       // Previous block's random number
                    msg.sender,             // Address of the entity requesting the OTP
                    OtpSeed                 // OTP seed provided by the user
                )
            )
        );

        // Set the OTP validity period to 30 seconds from the current block timestamp
        otpTimeValid = block.timestamp + 30;

        // Reduce the generated hash to a smaller 9-digit number
        uint256 Authentication = OTPs % 999999999;
        return Authentication;
    }

    // Function to authenticate a user by verifying their OTP
    function AuthenticateUser(address _userAddress, uint256 AuthOtp)
        public
        returns (bool)
    {
        // Ensure the provided user address is valid
        require(_userAddress != address(0), "Provide the Valid Address");

        // Ensure the sender address is valid
        require(msg.sender != address(0), "User is not having Valid Address");

        // Ensure that the OTP has not expired (valid within 30 seconds of generation)
        require(otpTimeValid > block.timestamp, "your OTP is timeout.");

        // Ensure the OTP has not already been used
        require(
            !AthenticationCode[msg.sender][AuthOtp],
            "Otp is already being used."
        );

        // Ensure the user is registered and has an active status
        require(
            userRegisterInfo[_userAddress].Status,
            "You are not an Authenticate User."
        );

        // Mark the OTP as used for the sender
        AthenticationCode[msg.sender][AuthOtp] = true;

        // Emit the authentication success event
        emit AuthenticationSuccess(_userAddress, msg.sender);

        return true;  // Return true indicating successful authentication
    }
}
