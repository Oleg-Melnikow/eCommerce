import axios from "axios";

export async function getToken(): Promise<void> {
  try {
    const response = await axios.post(
      `${process.env.CTP_AUTH_URL}/oauth/token`,
      null,
      {
        params: {
          grant_type: "client_credentials",
          scope: process.env.CTP_SCOPES,
        },
        auth: {
          username: process.env.CTP_CLIENT_ID ?? "",
          password: process.env.CTP_CLIENT_SECRET ?? "",
        },
      }
    );

    if (response.status === 200) {
      const accessToken = response.data.access_token;
      localStorage.setItem("ACCES_TOKEN", accessToken);
    } else {
      console.error(
        `Error fetching token: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    if (error instanceof Error)
      console.error(`Error fetching token: ${error.message}`);
  }
}
