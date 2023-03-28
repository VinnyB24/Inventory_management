import { FC } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { DataProps } from "../utils/types";

interface AuthComponentProps {
	titleText?: string;
	isPassword?: boolean;
	buttonText?: string;
	linkText?: string;
	linkPath?: string;
	onSubmit: (value: DataProps) => void;
	loading?: boolean;
	isUpdatePassword?: boolean;
}

const AuthComponent: FC<AuthComponentProps> = ({
	titleText = "Sign In",
	isPassword = true,
	buttonText = "Login",
	linkText = "บัญชีผู้ใช้ใหม่",
	linkPath = "/check-user",
	onSubmit,
	loading = false,
	isUpdatePassword = false,
}) => {
	return (
		<div className="login">
			<div className="inner">
				<div className="header">
					<h3>{titleText}</h3>
					<h2>KMUTNB IMS</h2>
				</div>

				<Form layout="vertical" onFinish={onSubmit}>
					{!isUpdatePassword && (
						<Form.Item
							label="Username"
							name="username"
							rules={[
								{ required: true, message: "Please input your Username!" },
							]}
						>
							<Input placeholder="Username" type="text" />
						</Form.Item>
					)}
					{isPassword && (
						<Form.Item
							label="Password"
							name="password"
							rules={[
								{ required: true, message: "Please input your password!" },
							]}
						>
							<Input placeholder="Password" type="password" />
						</Form.Item>
					)}
					{isUpdatePassword && (
						<Form.Item
							label="Confirm Password"
							name="cpassword"
							rules={[
								{
									required: true,
									message: "Please input your password confirmation!",
								},
							]}
						>
							<Input placeholder="Confirm Password" type="password" />
						</Form.Item>
					)}
					<Form.Item>
						<Button htmlType="submit" type="primary" block loading={loading}>
							{buttonText}
						</Button>
					</Form.Item>
				</Form>
				{/* <Link to={linkPath}>{linkText}</Link> */}
			</div>
		</div>
	);
};

export default AuthComponent;
