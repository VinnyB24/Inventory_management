import React, { FC, useState } from "react";
import { logout } from "../utils/functions";
import { useAuth } from "../utils/hooks";
import Layout from "./Layout";

type Props = {
	children: React.ReactNode;
};

const AuthRoute: FC<Props> = ({ children }) => {
	// homepage lock start

	// const [loading, setLoading] = useState(true);

	// useAuth({
	// 	errorCallBack: () => {
	// 		logout();
	// 	},
	// 	successCallBack: () => {
	// 		setLoading(false);
	// 	},
	// });

	// if (loading) {
	// 	return <i>loading...</i>;
	// }

	// homepage lock end

	return <Layout>{children}</Layout>;
};

export default AuthRoute;
