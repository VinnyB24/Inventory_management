import { FC, useState, useEffect } from "react";
import { axiosRequest } from "../utils/functions";
import { ShopUrl } from "../utils/network";
import ContentLayout from "../components/ContentLayout";
import { DataProps } from "../utils/types";
import AddShopForm from "../components/AddShopForm";

interface ShopProps {
	created_at: string;
	name: string;
	created_by: DataProps;
	created_by_username?: string;
	id: number;
}

const Shop: FC = () => {
	const [modalState, setModalState] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [shops, setshops] = useState<ShopProps[]>([]);

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Created By",
			dataIndex: "created_by_username",
			key: "created_by_username",
		},
		{
			title: "Created At",
			dataIndex: "created_at",
			key: "created_at",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
		},
	];

	const getShops = async () => {
		const response = await axiosRequest<{ results: ShopProps[] }>({
			url: ShopUrl,
			hasAuth: true,
			showError: false,
		});

		if (response) {
			const data = response.data.results.map((item) => ({
				...item,
				created_by_username: item.created_by.username as string,
			}));
			console.log({ data });
			setshops(data);
			setFetching(false);
		}
	};

	useEffect(() => {
		getShops();
	}, []);

	const onCreateUser = () => {
		setModalState(false);
		setFetching(true);
		getShops();
	};

	return (
		<ContentLayout
			pageTitle="Shop"
			setModalState={setModalState}
			dataSource={shops as unknown as DataProps[]}
			columns={columns}
			fetching={fetching}
		>
			<AddShopForm
				onSuccessCallBack={onCreateUser}
				isModalOpen={modalState}
				onClose={() => setModalState(false)}
			/>
		</ContentLayout>
	);
};

export default Shop;
