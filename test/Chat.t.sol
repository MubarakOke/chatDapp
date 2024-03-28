// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Chat} from "../src/Chat.sol";
import {ENS} from "../src/ENS.sol";

contract CounterTest is Test {
    ENS public ens;
    Chat public chat;

    address MubiAddr = address(0x477b144FbB1cE15554927587f18a27b241126FBC);
    address DavAddr = address(0xe902aC65D282829C7a0c42CAe165D3eE33482b9f);

    function setUp() public {
        ens = new ENS();
        chat = new Chat(address(ens));

        switchSigner(MubiAddr);
        ens.setName("Mubi");

        switchSigner(DavAddr);
        ens.setName("Dave");
    }

    function test_SetName() public view {
        assertEq(ens.getNameFromAddress(MubiAddr), "Mubi");
        assertEq(ens.getNameFromAddress(DavAddr), "Dave");
    }

    function test_SendMessage() public {
        switchSigner(MubiAddr);
        chat.sendMessage("Dave", "Hello");
        assertEq(chat.getSentMessages("Dave")[0], "Hello");
    }

    function test_getMessage() public {
        switchSigner(MubiAddr);
        chat.sendMessage("Dave", "Hello");

        switchSigner(DavAddr);

        console.log("log array");        
        console.log(chat.getChats("Mubi")[0]);
        assertEq(chat.getChats("Mubi")[0], "Hello");
    }

    function switchSigner(address _newSigner) public {
        address foundrySigner = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;
        if (msg.sender == foundrySigner) {
            vm.startPrank(_newSigner);
        } else {
            vm.stopPrank();
            vm.startPrank(_newSigner);
        }
    }

    // function testFuzz_SetNumber(uint256 x) public {
    //     chat.setNumber(x);
    //     assertEq(chat.number(), x);
    // }
}
