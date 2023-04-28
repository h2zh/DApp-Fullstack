import { Text, Page, Code, Link, Button } from "@vercel/examples-ui";
import { useState } from "react";
import CCard from "../components/CCard";

function CampaignList() {
  const testCList = [
    {
      state: "Fundraising",
      admin: "what-the-heck-is-this",
      creator: "0x620e4C6680a0C6B09673CBC2A6f1E73EEb34a2f0",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Mauris rhoncus ultricies nisi, ut varius elit convallis sed. Cras ac interdum purus. Proin dictum nisl id rutrum dictum. Aliquam vitae consectetur justo. Curabitur mattis odio diam. Phasellus blandit elit ante, vitae fringilla mi vulputate dignissim. Integer vel ipsum justo. Nam dictum sem mollis, mollis urna vel, pulvinar turpis. Aenean quis sollicitudin orci, id dignissim sem.",
      target_amount: 100,
      has_raised_amount: 33,
      deadline: 1468959781804, // integer
      min_contribution: 2,
    },
    {
      state: "Fundraising",
      admin: "what-the-heck-is-this",
      creator: "0x620e4C6680a0C6B09673CBC2A6f1E73EEb34a2f0",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Mauris rhoncus ultricies nisi, ut varius elit convallis sed. Cras ac interdum purus. Proin dictum nisl id rutrum dictum. Aliquam vitae consectetur justo. Curabitur mattis odio diam. Phasellus blandit elit ante, vitae fringilla mi vulputate dignissim. Integer vel ipsum justo. Nam dictum sem mollis, mollis urna vel, pulvinar turpis. Aenean quis sollicitudin orci, id dignissim sem.",
      target_amount: 100,
      has_raised_amount: 33,
      deadline: 1468959781804, // integer
      min_contribution: 2,
    },
    {
      state: "Fundraising",
      admin: "what-the-heck-is-this",
      creator: "0x620e4C6680a0C6B09673CBC2A6f1E73EEb34a2f0",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Mauris rhoncus ultricies nisi, ut varius elit convallis sed. Cras ac interdum purus. Proin dictum nisl id rutrum dictum. Aliquam vitae consectetur justo. Curabitur mattis odio diam. Phasellus blandit elit ante, vitae fringilla mi vulputate dignissim. Integer vel ipsum justo. Nam dictum sem mollis, mollis urna vel, pulvinar turpis. Aenean quis sollicitudin orci, id dignissim sem.",
      target_amount: 100,
      has_raised_amount: 33,
      deadline: 1468959781804, // integer
      min_contribution: 2,
    },
  ];

  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Browse All Campaigns</Text>
        {testCList.map((campaign) => {
          return <CCard key={campaign.title} {...campaign}></CCard>;
        })}
      </section>
    </Page>
  );
}

export default CampaignList;
