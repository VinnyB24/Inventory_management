import { FC, useState, useContext, useEffect } from "react";
import AuthComponent from "../components/AuthComponent";
import { ActionTypes, DataProps } from "../utils/types";
import { useAuth } from "../utils/hooks";
import { useNavigate } from "react-router-dom";
import { axiosRequest } from "../utils/functions";
import { store } from "../utils/store";
import { UpdatePasswordUrl } from "../utils/network";
import { notification } from "antd";

const UpdateUserPassword: FC = () => {
	const [loading, setLoading] = useState(false);
	const {
		state: { updatePasswordUserId },
		dispatch,
	} = useContext(store);

	const navigate = useNavigate();

	useEffect(() => {
		if (!updatePasswordUserId) {
			navigate("/");
		}
	}, []);

	useAuth({
		successCallBack: () => {
			navigate("/");
		},
	});

	const onSubmit = async (values: DataProps) => {
		setLoading(true);
		if (values["password"] !== values["password"]) {
			notification.error({
				message: "Invalid Data",
				description: "Your password do not match",
			});
			return;
		}
		const response = await axiosRequest({
			method: "post",
			url: UpdatePasswordUrl,
			payload: { ...values, user_id: updatePasswordUserId },
		});
		if (response) {
			dispatch({
				type: ActionTypes.UPDATE_PASSWORD_USER_ID,
				payload: null,
			});
			notification.success({
				message: "Operation Successful",
				description: "Your password was created successfully",
			});
			navigate("/login");
		}
		setLoading(false);
	};

	return (
		<AuthComponent
			titleText="Create Password!"
			buttonText="Update"
			linkText="Go Back"
			linkPath="/Check-user"
			isUpdatePassword={true}
			loading={loading}
			onSubmit={onSubmit}
		/>
	);
};

export default UpdateUserPassword;
