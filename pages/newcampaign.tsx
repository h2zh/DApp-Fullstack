import { Text, Page, Code, Link, Button } from "@vercel/examples-ui";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addToCampaigns } from "../redux/reducers/campaigns";
import { useRouter } from "next/router";
import { createProject, payDeposit } from "../scripts/bfunctions";
import LoadingCircle from "../components/LoadingCircle";

function NewCampaign() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<number>();
  const [minAmount, setMinAmount] = useState<number>();
  const [deadline, setDeadline] = useState<number>(14); // the type of deadline is string
  const [deposit, setDeposit] = useState<number>();
  const { userObject } = useAppSelector((state: any) => state.users);
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  // const payDepositFrontend = async () => {
  //   await payDeposit(userObject["address"], userPrivateKey, 0.001);
  // };
  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!title || !description || !targetAmount) {
      alert("Please enter all fields");
      return;
    }

    const userAddress = userObject["address"];
    console.log("deadline:", deadline);
    // block.timestamp is a uint256 value in seconds
    const deadlineUnix = Math.floor(Date.now() / 1000) + deadline * 60 * 60; // Unix timestamp (s)
    console.log(typeof deadlineUnix, deadlineUnix);
    if (userAddress && deposit) {
      setLoading(true);
      const campaignAddr = await createProject(
        userAddress,
        title,
        description,
        targetAmount,
        deadlineUnix,
        minAmount
      );
      setLoading(false);

      dispatch(
        addToCampaigns({
          projectAddress: campaignAddr,
          creatorAccount: userAddress,
          title: title,
          description: description,
          targetAmount: targetAmount,
          deadline: deadlineUnix,
          minContribution: minAmount,
          currentAmt: 0,
        })
      );
      // await payDeposit(campaignAddr, deposit);
      alert(
        `Campaign successfully created at ${campaignAddr} and deposit is paid.`
      );
      push("/");
    } else {
      alert("You have to connect to your wallet first");
    }
  };

  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">New Campaign</Text>
        <form
          className="flex flex-col items-left space-y-4"
          onSubmit={onSubmit}
        >
          <span className="block text-md font-medium text-slate-700">
            Title
          </span>
          <input
            className="form-input border-2 border-slate-500 rounded-md p-3"
            type="text"
            placeholder="Enter a title for this campaign"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className="block text-md font-medium text-slate-700">
            Description
          </span>
          <textarea
            rows={4}
            maxLength={450}
            className="form-input border-2 border-slate-500 rounded-md p-3"
            placeholder="Enter a description for this campaign"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-row space-x-8">
            <div className="flex flex-col items-left space-y-4">
              <span className="block text-md font-medium text-slate-700">
                Target Amount (ETH)
              </span>
              <input
                className="form-input border-2 border-slate-500 rounded-md p-3"
                type="number"
                step=".000000001"
                placeholder="Enter an amount"
                value={targetAmount}
                onChange={(e) => {
                  const inputAmt = parseFloat(e.target.value);
                  setTargetAmount(inputAmt);
                  if (inputAmt !== 0) {
                    setMinAmount(parseFloat(e.target.value) / 200);
                    setDeposit(parseFloat(e.target.value) / 100);
                  }
                }}
              />
            </div>

            <div className="flex flex-col items-left space-y-4">
              <span className="block text-md font-medium text-slate-700">
                Minimal Contribution
              </span>
              <input
                className="form-input border-2 border-slate-500 rounded-md p-3"
                type="number"
                step=".000000001"
                disabled={true}
                placeholder="0.5% of Target Amount"
                value={minAmount}
              />
            </div>

            <div className="flex flex-col items-left space-y-4">
              <span className="block text-md font-medium text-slate-700">
                Due in how many hours
              </span>
              <input
                className="form-input border-2 border-slate-500 rounded-md p-3"
                type="number" // datetime-local
                placeholder="How many hours later is it due?"
                value={deadline}
                onChange={(e) => setDeadline(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-end">
            <div className="flex flex-col items-left space-y-4">
              <span className="block text-md font-medium text-slate-700">
                Deposit
              </span>
              <input
                className="form-input border-2 border-slate-500 rounded-md p-3"
                type="number"
                step=".000000001"
                disabled={true}
                placeholder="1% of Target Amount"
                value={deposit}
              />
            </div>
            <div>
              <Button type="submit" className="p-6 font-extrabold text-md">
                {loading ? <LoadingCircle /> : null}
                Create Campaign
              </Button>
            </div>
          </div>
        </form>
      </section>
    </Page>
  );
}
export default NewCampaign;
