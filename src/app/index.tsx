"use client";
import { useState, useEffect } from "react";
import data from "../data.json";
import BlockFalse from "./blockFalse.tsx";
import BlockTrue from "./blockTrue.tsx";
import BlockElse from "./blockElse.tsx";

export default function Body() {
  const [params, setParams] = useState({
    id: "",
    name: "",
    money: "",
    note: "",
  });

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setParams({
      id: search.get("upiid") || "",
      name: search.get("name") || "",
      money: search.get("money") || "",
      note: search.get("note") || "Payment through upi",
    });
  }, []);

  useEffect(() => {
    data.UPI = params.id;
    data.NAME = params.name;
    data.NOTE = params.note;

    if (isNaN(Number(params.money)) || !params.money) {
      data.MONEY = "0";
    } else {
      data.MONEY = params.money;
    }
  }, [params]);

  return (
    <>
      <script>
        {`\n ██╗░░░██╗██████╗░██╗ \n ██║░░░██║██╔══██╗██║ \n
██║░░░██║██████╔╝██║ \n ██║░░░██║██╔═══╝░██║ \n ╚██████╔╝██║░░░░░██║ \n
░╚═════╝░╚═╝░░░░░╚═╝ `}
      </script>
      {data.UPI == "" && data.NAME == "" ? (
        <div>
          <BlockFalse />
        </div>
      ) : data.UPI != "" && data.NAME != "" ? (
        <div>
          <BlockTrue />
        </div>
      ) : (
        <div>
          <BlockElse />
        </div>
      )}
    </>
  );
}
