import { getApiHost } from "@/lib/apiUtils";
import { useAuth } from "@clerk/clerk-react";
import { generateUploadButton } from "@uploadthing/react";

export const UploadButton = (props): JSX.Element => {
  const { getToken } = useAuth();

  const Button = generateUploadButton({
    url: `${getApiHost()}/uploadthing`,
  });

  return <Button {...props} />;
};
