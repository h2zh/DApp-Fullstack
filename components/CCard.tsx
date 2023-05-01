import { Button } from "@vercel/examples-ui";
import Link from "next/link";
import React, { useState } from "react";
import { contribute } from "../scripts/bfunctions";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { modifyCampaigns } from "../redux/reducers/campaigns";
import { withdraw, refund, finalize } from "../scripts/bfunctions";

enum CampaignState {
  Fundraising,
  Expired,
  Successful,
}

const getState = (ddl: any, curAmt: any, targetAmt: any) => {
  // console.log(Date.now(), ddl);
  if (Date.now() < ddl) {
    return CampaignState.Fundraising;
  } else if (curAmt < targetAmt) {
    return CampaignState.Expired;
  } else {
    return CampaignState.Successful;
  }
};

const colorMaker = (state: any) => {
  if (state === CampaignState.Fundraising) {
    return "bg-cyan-500";
  } else if (state === CampaignState.Expired) {
    return "bg-red-500";
  } else if (state === CampaignState.Successful) {
    return "bg-emerald-500";
  }
};

const stateToString = (state: any) => {
  if (state === CampaignState.Fundraising) {
    return "Fundraising";
  } else if (state === CampaignState.Expired) {
    return "Expired";
  } else if (state === CampaignState.Successful) {
    return "Successful";
  }
};

const CCard = (props: any) => {
  const { campaigns } = useAppSelector((state: any) => state.campaigns);
  const { userObject } = useAppSelector((state: any) => state.users);
  const userAddress = userObject["address"];
  const isOwner = props.creator === userAddress;

  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<number>();
  const date = new Date(props.deadline * 1000); // convert deadline in s to ms
  let state = getState(date, props.has_raised_amount, props.target_amount);

  const addAmt = (amt: number, id: any) => {
    const newCampaigns = campaigns.map((c: any) => {
      if (c.id === id) {
        return { ...c, currentAmt: amt };
      }
      return c;
    });
    dispatch(modifyCampaigns(newCampaigns));
  };

  return (
    <div className="card relative overflow-hidden my-3 space-y-2 ">
      <div
        className={`ribbon ${colorMaker(
          state
        )}  p-1 px-3 flex flex-auto justify-between text-white font-semibold`}
      >
        <div>{stateToString(state)} </div>

        <div>{(props.has_raised_amount / props.target_amount) * 100}%</div>
      </div>
      <h1 className=" text-xl text-gray font-semibold hover:text-sky-500 hover:cursor-pointer">
        {props.title}
      </h1>
      <p className=" text-sm text-stone-800 tracking-tight">
        Campaign Contract Address: {props.projectAddress}
      </p>
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
          {state === CampaignState.Fundraising ? (
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
                  onClick={async () => {
                    if (!amount || amount < props.min_contribution) {
                      alert("Please enter a valid amount");
                      return;
                    }
                    if (Date.now() > props.deadline) {
                      alert(
                        "This campaign has been expired and no longer receive contribution"
                      );
                      return;
                    }
                    const isContributeSucceed = await contribute(
                      props.projectAddress,
                      amount
                    );
                    addAmt(amount, props.deadline);
                    console.log(isContributeSucceed);
                    setAmount(0);
                  }}
                >
                  Contribute
                </Button>
              </div>
              <p className="text-sm ">
                Minimum contribution: {props.min_contribution} ETH{" "}
              </p>
            </>
          ) : (
            isOwner && (
              <>
                <div className="flex flex-row space-x-4">
                  <Button
                    type="submit"
                    disabled={!isOwner}
                    onClick={async () => {
                      await withdraw(props.projectAddress);
                      await finalize(props.projectAddress);
                    }}
                  >
                    Withdraw
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isOwner}
                    onClick={async () => {
                      await refund(props.projectAddress);
                      await finalize(props.projectAddress);
                    }}
                  >
                    Refund
                  </Button>
                </div>
              </>
            )
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
