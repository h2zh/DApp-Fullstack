import { Button } from "@vercel/examples-ui";
import Link from "next/link";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { modifyCampaigns } from "../redux/reducers/campaigns";
import { contribute, withdraw, refund, getDetail } from "../scripts/bfunctions";
import LoadingCircle from "./LoadingCircle";
enum CampaignState {
  Fundraising,
  Expired,
  Successful,
}

const getState = (ddl: any, curAmt: any, targetAmt: any) => {
  // console.log(Date.now(), ddl);
  if (curAmt >= targetAmt) {
    return CampaignState.Successful;
  } else if (Date.now() < ddl) {
    return CampaignState.Fundraising;
  } else {
    return CampaignState.Expired;
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
  const [contributeLoading, setContributeLoading] = useState(false);
  const [withdrawLoading, setwWithdrawLoading] = useState(false);
  const [refundLoading, setRefundLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<number>();
  const date = new Date(props.deadline * 1000); // convert deadline in s to ms
  let state = getState(date, props.has_raised_amount, props.target_amount);

  // console.log(typeof amount, amount);

  const addAmt = (amt: number, key: any) => {
    const updatedCampaigns = campaigns.map((c: any) => {
      if (c.deadline === key) {
        const newAmt = amt + c.currentAmt; // use the property name in the Campaign interface, instead of the props in the parent component
        return { ...c, currentAmt: newAmt };
      } else {
        return c;
      }
    });
    dispatch(modifyCampaigns(updatedCampaigns));
  };

  // backup func: how to call: async () => updateAmt(props.projectAddress)
  const updateAmt = async (projectAddress: any) => {
    const newProjectDetails = await getDetail(projectAddress);
    console.log(newProjectDetails);
    // return parseInt(newProjectDetails.raised_amount._hex);
  };

  const handleContribute = async () => {
    if (!amount || amount < props.min_contribution) {
      alert("Please enter a valid amount");
      return;
    }
    if (Date.now() > props.deadline * 1000) {
      alert(
        "This campaign has been expired and no longer receive contribution"
      );
      return;
    }
    // check curAmt before contribute in console
    // await updateAmt(props.projectAddress);
    setContributeLoading(true);
    const isContributeSucceed = await contribute(props.projectAddress, amount);
    setContributeLoading(false);
    // console.log(isContributeSucceed);
    // check curAmt after contribute in console
    // await updateAmt(props.projectAddress);
    isContributeSucceed &&
      alert(`Thank you! Your contribution of ETH ${amount} is successful.`);
    addAmt(amount, props.deadline);
    setAmount(0);
  };

  function removeCampaignWithId(key: any) {
    const updatedCampaigns = campaigns.filter((c: any) => c.deadline !== key);
    dispatch(modifyCampaigns(updatedCampaigns));
    console.log("Removal succeeded");
    return true;
  }

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
                  className="form-input border-2 border-slate-500 rounded-md p-1 w-30"
                />

                <Button type="submit" onClick={handleContribute}>
                  {contributeLoading ? <LoadingCircle /> : null}
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
                      setwWithdrawLoading(true);
                      const isOk = await withdraw(props.projectAddress);
                      setwWithdrawLoading(false);
                      isOk && alert("Your withdraw is successfully completed.");
                      isOk && removeCampaignWithId(props.deadline);
                    }}
                  >
                    {withdrawLoading ? <LoadingCircle /> : null}
                    Withdraw & Finalize
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isOwner}
                    onClick={async () => {
                      setRefundLoading(true);
                      const isOk = await refund(props.projectAddress);
                      setRefundLoading(false);
                      isOk && alert("Your refund is successfully completed.");
                      isOk && removeCampaignWithId(props.deadline);
                    }}
                  >
                    {refundLoading ? <LoadingCircle /> : null}
                    Refund & Finalize
                  </Button>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CCard;
