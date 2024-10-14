import { useNavigate } from "react-router-dom";
import "./style.css";
import { useState } from "react";

export const Tab = ({ tab, deleteTab }) => {
	const [hovered, setHovered] = useState(false);
	const navigate = useNavigate();
  
	const params = new URLSearchParams(window.location.search);
	const currentTab = params.get("tab");
  const tabStatus = currentTab === tab.toLowerCase().trim().replace(/\s+/g, "");

	const setParams = (param) => {
		const createdParam = param.toLowerCase().trim().replace(/\s+/g, "");
		navigate(`?tab=${createdParam}`);
		console.log(createdParam);
	};


	return (
		<div
			className={`tab ${tabStatus ? 'choosed' : ''}`}
			onClick={() => setParams(tab)}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>
			<img
				src={`img/${tab}.png`}
				alt={tab}
				className="tab-icon"
			/>
			<p
				className="tab-name"
				style={
					currentTab === tab.toLowerCase().trim().replace(/\s+/g, "")
						? { color: "black" }
						: null
				}>
				{tab}
			</p>
			{hovered && (
				<img
					src="img/delete.png"
					alt="delete button"
          className="delete"
          onClick={() => deleteTab(tab)}
				/>
      )}
      
    {tabStatus && <div className="border"></div>}
		</div>
	);
};
