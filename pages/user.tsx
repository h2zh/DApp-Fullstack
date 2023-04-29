import { getSession, signOut } from "next-auth/react";
import { Text, Page, Code, Link, Button } from "@vercel/examples-ui";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setUserObject } from "../redux/reducers/users";
import { useEffect, useState } from "react";

// gets a prop from getServerSideProps
function User({ user }: any) {
  // console.log(user);
  const { userObject } = useAppSelector((state: any) => state.users);
  const dispatch = useAppDispatch();
  console.log(userObject);

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
