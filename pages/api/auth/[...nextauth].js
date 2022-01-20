import axios from "axios";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import "../../../styles/globals.css";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        Email: {
          label: "email",
          type: "email",
          placeholder: "johndoe@test.com",
          className: "bg-blue-800"
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await axios.post("https://maway.atiar.info/api/v1/auth/login", {
            email: credentials.Email,
            password: credentials.password
        }, {
          headers: {
            role: 'sa'
          }
        });
        console.log(credentials);
        if (response) {
          console.log(response.data);
          return response.data
        }

        // login failed
        return response.data;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.data = user;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.data = token.data;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
  pages: {
    // signIn: '/signin',
  },
});
