import { getSession, signOut } from "next-auth/react";
import { Text, Page, Code, Link, Button } from "@vercel/examples-ui";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setUserObject, setUserPrivateKey } from "../redux/reducers/users";
import { useEffect, useState } from "react";

// gets a prop from getServerSideProps
function User({ user }: any) {
  const { userObject, userPrivateKey } = useAppSelector(
    (state: any) => state.users
  );
  const dispatch = useAppDispatch();
  const [pkey, setPkey] = useState("");
  const [lockPrivateKey, setLockPrivateKey] = useState(false);
  console.log("pkey", pkey);
  console.log("userPrivateKey", userPrivateKey);

  // prevent static generated content differs from SSG content
  // https://github.com/vercel/next.js/discussions/35773?sort=top#discussioncomment-4846619
  useEffect(() => {
    dispatch(setUserObject(user));
  }, [user]);

  const [showDetail, setShowDetail] = useState(false);
  const toggleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  const handleSignOut = () => {
    dispatch(setUserObject(null));
    signOut({ callbackUrl: "/signin" });
  };

  const toggleLockPrivateKey = () => {
    if (lockPrivateKey === false) {
      console.log("lockPrivateKey === false");
      dispatch(setUserPrivateKey(pkey));
    }
    setLockPrivateKey(!lockPrivateKey);
  };

  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">User session</Text>

        <div className="flex flex-row space-x-4 items-center">
          {userObject && <Text>Account Address: {userObject["address"]}</Text>}
          <Button width={120} variant="secondary" onClick={toggleShowDetail}>
            Wallet Detail
          </Button>
        </div>
        {showDetail && <pre>{JSON.stringify(user, null, 2)}</pre>}
        <div className="flex flex-col space-y-1">
          <Text>Private Key:</Text>
          <div className="flex flex-row space-x-4 w-full">
            <input
              className="form-input border-2 border-slate-500 rounded-md p-1 grow"
              type={lockPrivateKey ? "password" : "text"}
              placeholder="Paste here"
              value={pkey}
              onChange={(e) => setPkey(e.target.value)}
              disabled={lockPrivateKey}
            />
            <Button
              width={118}
              variant={lockPrivateKey ? "secondary" : "primary"}
              onClick={toggleLockPrivateKey}
            >
              {lockPrivateKey ? "Modify" : "Submit"}
            </Button>
          </div>
          <Link
            className="text-sm"
            rel="noopener noreferrer"
            target="_blank"
            href="https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key#:~:text=On%20the%20account%20page%2C%20click,click%20%E2%80%9CConfirm%E2%80%9D%20to%20proceed."
          >
            How to get my account's private key?
          </Link>
        </div>
        <Button
          width={100}
          variant="black"
          // className="bg-red-500"
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </section>
    </Page>
  );
}
// in the above func, have changed redirect to callbackUrl https://next-auth.js.org/getting-started/client

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default User;
