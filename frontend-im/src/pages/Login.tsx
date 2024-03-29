import { FC, useState } from "react";
import AuthComponent from "../components/AuthComponent";
import { DataProps } from "../utils/types";
import { tokenName } from "../utils/data";
import { LoginUrl } from "../utils/network";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/hooks";
import { axiosRequest } from "../utils/functions";

interface LoginDataProps {
	access: string;
}

const Login: FC = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useAuth({
		successCallBack: () => {
			navigate("/");
		},
	});

	const onSubmit = async (values: DataProps) => {
		setLoading(true);
		const response = await axiosRequest<LoginDataProps>({
			method: "post",
			url: LoginUrl,
			payload: values,
			errorObject: {
				message: "Login Error",
			},
		});
		if (response) {
			localStorage.setItem(tokenName, response.data.access);
			navigate("/");
		}
		setLoading(false);
	};

	return <AuthComponent onSubmit={onSubmit} loading={loading} />;
};

export default Login;
