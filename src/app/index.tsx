'use client'
import { useState, useEffect } from "react";
import Image from "next/image"
import data from "../data.json"
import { useSearchParams } from "next/navigation";
import BlockFalse from "./blockFalse";
import BlockTrue from "./blockTrue";
import BlockElse from "./blockElse";
export default function Body() {
    const searchParams = useSearchParams();
    const id = searchParams.get("upiid");
    const name = searchParams.get("name");
    const money = searchParams.get("money");
    const note = searchParams.get("note"); // Read note from URL params

    // It's generally better to avoid mutating imported JSON directly if it might be cached by module system.
    // For this app structure, it might be fine, but for larger apps, consider state management.
    data.UPI = id || "";
    data.NAME = name || "";
    data.NOTE = note || "Payment through upi"; // Set note, fallback to default

    if(isNaN(Number(money)) || !money) { // Ensure money is a valid number, default to 0 if not
        data.MONEY = "0";
    }else{
        data.MONEY = money;
    }
    return (
        <>
            <script>
                console.log(`
                \n ██╗░░░██╗██████╗░██╗
                \n ██║░░░██║██╔══██╗██║
                \n ██║░░░██║██████╔╝██║
                \n ██║░░░██║██╔═══╝░██║
                \n ╚██████╔╝██║░░░░░██║
                \n ░╚═════╝░╚═╝░░░░░╚═╝ 
                `);
            </script>
            {
                (data.UPI=="" && data.NAME=="") ? (
                    <div>
                        <BlockFalse />
                    </div>
                ) : (data.UPI!="" && data.NAME !="") ? (
                    <div>
                        <BlockTrue />
                    </div>
                ) : (
                    <div>
                        <BlockElse />
                    </div>
                )
            }
        </>

    )
}