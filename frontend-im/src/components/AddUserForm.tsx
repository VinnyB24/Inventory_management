import { Modal, Form, Input, Select, Button, notification } from "antd";
import { FC, useState } from "react";
import { axiosRequest } from "../utils/functions";
import { DataProps, FormModalProps } from "../utils/types";
import { CreateUserUrl } from "../utils/network";

const { Option } = Select;

interface AddUserFormProps {
	isModalOpen?: boolean;
	onSuccessCallBack: () => void;
	onClose: () => void;
}

const AddUserForm: FC<FormModalProps> = ({
	isModalOpen = false,
	onSuccessCallBack,
	onClose,
}) => {
	const [form] = Form.useForm();

	const [loading, setLoading] = useState(false);

	const onSubmit = async (values: DataProps) => {
		setLoading(true);

		const response = await axiosRequest({
			method: "post",
			url: CreateUserUrl,
			hasAuth: true,
			payload: values,
		});
		setLoading(false);

		if (response) {
			notification.success({
				message: "Operation Success",
				description: "User created successfully",
			});
			onSuccessCallBack();
			form.resetFields();
		}
	};

	return (
		<Modal
			title="Add User"
			open={isModalOpen}
			onCancel={onClose}
			footer={false}
		>
			<Form layout="vertical" onFinish={onSubmit} form={form}>
				<Form.Item
					label="username"
					name="username"
					rules={[{ required: true, message: "ใส่ Username ของคุณ!" }]}
				>
					<Input placeholder="ใส่ Username ของคุณ" type="text" />
				</Form.Item>
				<Form.Item
					label="password"
					name="password"
					rules={[{ required: true, message: "ใส่ password!" }]}
				>
					<Input placeholder="ใส่ password" type="text" />
				</Form.Item>
				<Form.Item
					label="Name"
					name="fullname"
					rules={[
						{
							required: true,
							message: "โปรดใส่ชื่อของคุณ!",
						},
					]}
				>
					<Input placeholder="ใส่ชื่อของคุณ" type="text" />
				</Form.Item>
				<Form.Item
					label="Role"
					name="role"
					rules={[{ required: true, message: "โปรดใส่ลำดับชั้นของคุณ!" }]}
				>
					<Select placeholder="ใส่ลำดับชั้นของคุณ">
						<Option value="admin">Admin</Option>
						<Option value="creator">Creator</Option>
						<Option value="sale">Sale</Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" type="primary" block loading={loading}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddUserForm;
