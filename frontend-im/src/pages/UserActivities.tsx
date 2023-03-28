import { FC, useState, useEffect } from "react";
import { axiosRequest } from "../utils/functions";
import { ActivitiesUrl } from "../utils/network";
import ContentLayout from "../components/ContentLayout";
import { DataProps } from "../utils/types";

interface UserActivitiesProps {
	created_at: string;
	name: string;
	created_by: DataProps;
	created_by_username?: string;
	id: number;
}

const UserActivities: FC = () => {
	const [fetching, setFetching] = useState(true);
	const [userActivities, setUserActivities] = useState<UserActivitiesProps[]>(
		[]
	);

	const columns = [
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
		},
		{
			title: "Performed By",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Created At",
			dataIndex: "created_at",
			key: "created_at",
		},
	];

	const getActivities = async () => {
		const response = await axiosRequest<{ results: UserActivitiesProps[] }>({
			url: ActivitiesUrl,
			hasAuth: true,
			showError: false,
		});
		// user;

		if (response) {
			const data = response.data.results;
			setUserActivities(data);
			setFetching(false);
		}
	};

	useEffect(() => {
		getActivities();
	}, []);

	return (
		<ContentLayout
			pageTitle="User Activitie"
			dataSource={userActivities as unknown as DataProps[]}
			columns={columns}
			fetching={fetching}
			setModalState={function (val: boolean): void {
				throw new Error("Function not implemented.");
			}}
			disableAddButton
		/>
	);
};

export default UserActivities;
