import { Button } from "@vercel/examples-ui";
import Link from "next/link";
import React, { useState } from "react";

const colorMaker = (state: any) => {
  if (state === "Fundraising") {
    return "bg-cyan-500";
  } else if (state === "Expired") {
    return "bg-red-500";
  } else {
    // state === Successful
    return "bg-emerald-500";
  }
};

const CCard = (props: any) => {
  const [amount, setAmount] = useState<number>();
  const date = new Date(props.deadline);

  return (
    <div className="card relative overflow-hidden my-3 space-y-2 ">
      <div
        className={`ribbon ${colorMaker(
          props.state
        )}  p-1 px-3 flex flex-auto justify-between text-white font-semibold`}
      >
        <div>{props.state} </div>

        <div>{(props.has_raised_amount / props.target_amount) * 100}%</div>
      </div>
      <h1 className=" text-xl text-gray font-semibold hover:text-sky-500 hover:cursor-pointer">
        {props.title}
      </h1>
      <p>{props.admin}</p>
      <p className=" text-sm text-stone-800 tracking-tight">
        {props.description}
      </p>
      <div className="flex flex-col lg:flex-row lg:space-x-10">
        <div className="inner-card my-6 w-full ">
          <p className="text-md font-bold  text-gray">
            Raised / Targeted Amount
          </p>
          <p className="text-sm font-bold  text-cyan-600">
            {props.has_raised_amount} / {props.target_amount} ETH{" "}
          </p>
          <p className="text-md font-bold  text-gray">Deadline</p>
          <p className="text-sm font-bold  text-gray-600 ">
            {date.toLocaleDateString("en-US") +
              " " +
              date.toLocaleTimeString("en-US")}
          </p>
        </div>
        <div className="inner-card my-6 w-full">
          {props.state !== "Successful" ? (
            <>
              <label className="text-md font-bold  text-gray">
                Contribution amount
              </label>
              <div className="flex flex-row space-x-2">
                <input
                  type="number"
                  placeholder="Enter here"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  //   disabled={btnLoader === props.creator}
                  className="form-input border-2 border-slate-500 rounded-md p-1 w-30"
                />

                <Button
                  type="submit"
                  onClick={
                    () => console.log("TODO")
                    // contributeAmount(props.creator, props.min_contribution)
                  }
                  //   disabled={btnLoader === props.creator}
                >
                  {/* {btnLoader === props.address ? "Loading..." : "Contribute"} */}
                  Contribute
                </Button>
              </div>
              <p className="text-sm ">
                Minimum contribution: {props.min_contribution} ETH{" "}
              </p>
            </>
          ) : (
            <>
              <p className="text-md font-bold  text-gray">Contract balance</p>
              <p className="text-sm font-bold  text-gray-600 ">
                {props.contractBalance} ETH{" "}
              </p>

              {/* {props.creator === account ? (
                <>
                  <label className="text-sm text-gray-700 font-semibold">
                    Withdraw request :
                  </label>
                  <div className="flex flex-row">
                    <input
                      type="number"
                      placeholder="Type here"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={btnLoader === props.address}
                      className="input rounded-l-md"
                    />
                    <button
                      className="button"
                      onClick={() => requestForWithdraw(props.address)}
                    >
                      {btnLoader === props.address ? "Loading..." : "Withdraw"}
                    </button>
                  </div>
                </>
              ) : (
                ""
              )} */}
            </>
          )}
        </div>
      </div>

      {/* {props.state !== "Successful" ? (
        <div className="w-full bg-gray-200 rounded-full">
          <div className="progress" style={{ width: `${props.progress}%` }}>
            {" "}
            {props.progress}%{" "}
          </div>
        </div>
      ) : null} */}
    </div>
  );
};

export default CCard;
