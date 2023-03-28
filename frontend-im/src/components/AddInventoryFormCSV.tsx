import { Modal, Form, Button, notification } from "antd";
import { FC, useState, ChangeEvent } from "react";
import { axiosRequest } from "../utils/functions";
import { DataProps, FormModalProps } from "../utils/types";
import { InventoryCSVUrl } from "../utils/network";

const AddInventoryFormCSV: FC<FormModalProps> = ({
	isModalOpen = false,
	onSuccessCallBack,
	onClose,
}) => {
	const [form] = Form.useForm();

	const [loading, setLoading] = useState(false);
	const [csvFile, setCSVFile] = useState<File | null>(null);

	const onSubmit = async (values: DataProps) => {
		setLoading(true);

		if (!csvFile) return;

		const formItem = new FormData();
		formItem.append("data", csvFile);

		const response = await axiosRequest({
			method: "post",
			url: InventoryCSVUrl,
			hasAuth: true,
			payload: formItem,
		});
		setLoading(false);

		if (response) {
			notification.success({
				message: "Operation Success",
				description: "Inventory Items added successfully",
			});
			onSuccessCallBack();
			form.resetFields();
		}
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setCSVFile(e.target.files[0]);
		}
	};

	return (
		<Modal
			title="Add Inventory Item (CSV)"
			open={isModalOpen}
			onCancel={onClose}
			footer={false}
			maskClosable={false}
		>
			<Form layout="vertical" onFinish={onSubmit} form={form}>
				<Form.Item
					label="Select File (CSV)"
					rules={[{ required: true, message: "please select a file!" }]}
				>
					<input type="file" accept=".csv" onChange={handleFileChange} />
				</Form.Item>

				{/* link ไฟล์ Excel ตัวอย่าง CSV */}

				<div className="DLsampleCSV">
					<a href="/" download>
						Click here to download sample file
					</a>
				</div>

				{/* link ไฟล์ Excel end */}

				<div className="helperNote">
					NB. Do not include the header label, they are just for reference
				</div>
				<br />

				<Form.Item>
					<Button htmlType="submit" type="primary" block loading={loading}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddInventoryFormCSV;
