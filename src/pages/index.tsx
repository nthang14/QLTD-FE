import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
export default function Home() {
  const router = useRouter();
  const t = useTranslations();

  return <div></div>;
}
export async function getServerSideProps({ req }: any) {
  if (!req?.cookies?.accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}
