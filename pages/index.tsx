import { Layout, Text, Page, Code, Link } from "@vercel/examples-ui";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import CCard from "../components/CCard";

function Home() {
  const testMyCampaigns = [];
  const { campaigns } = useAppSelector((state: any) => state.campaigns);
  const { userObject } = useAppSelector((state: any) => state.users);
  const dispatch = useAppDispatch();

  const userAddress = userObject["address"];
  campaigns.forEach((c: any) => {
    console.log(c);
  });

  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Decentralized Crowdfunding</Text>
        <Text>
          Our goal is to create a decentralized crowdfunding platform that
          leverages the power of smart contracts and blockchain technology. This
          approach allows users to initiate fundraising campaigns, while
          enabling anyone to contribute with confidence. Through the use of
          immutable, decentralized ledgers, each contribution is securely
          recorded and tracked.
        </Text>
        <Text>
          To enhance transparency and mitigate potential fraud, the fundraising
          process requires approval from the majority of contributors before
          funds can be withdrawn from the smart contract. This collaborative
          decision-making process fosters trust and accountability within the
          platform.
        </Text>
        <Text>
          By eliminating intermediaries, our decentralized crowdfunding solution
          reduces costs and opens the door to a broader spectrum of individuals
          and projects.
        </Text>
      </section>

      <section className="flex flex-col gap-6 mt-10">
        <Text variant="h2">My Campaigns</Text>
        {campaigns.length > 0 ? (
          campaigns
            .filter((c: any) => {
              return c.creatorAccount === userAddress;
            })
            .map((c: any) => {
              return (
                <CCard
                  key={c.deadline}
                  state={"Fundraising"}
                  projectAddress={c.projectAddress}
                  creator={c.creatorAccount}
                  title={c.title}
                  description={c.description}
                  target_amount={c.targetAmount}
                  has_raised_amount={c.currentAmt}
                  deadline={c.deadline}
                  min_contribution={c.minContribution}
                />
              );
            })
        ) : (
          <Text>
            You're not currently running any campaigns,
            <Link href="/newcampaign"> start one now</Link>
          </Text>
        )}
      </section>

      {/* <hr className="border-t border-accents-2 my-6" />

      <section className="flex flex-col ">
        <Lobby />
      </section> */}
    </Page>
  );
}

Home.Layout = Layout;

export default Home;
