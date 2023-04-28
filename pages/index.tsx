import { Layout, Text, Page, Code, Link } from "@vercel/examples-ui";

function Home() {
  const testMyCampaigns = [];
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
        {testMyCampaigns.length > 0 ? (
          <div>TODO</div>
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
