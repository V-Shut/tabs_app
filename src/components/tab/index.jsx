import React, { forwardRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./style.css";

export const Tab = forwardRef(({ tab, index, deleteTab, setParams }, ref) => {
	const [hovered, setHovered] = useState(false);

	const params = new URLSearchParams(window.location.search);
	const currentTab = params.get("tab");
	const tabStatus = currentTab === tab.toLowerCase().trim().replace(/\s+/g, "");

	return (
		<Draggable
			key={tab}
			draggableId={`${tab.toLowerCase().trim().replace(/\s+/g, "")}`}
			index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`tab ${tabStatus ? "choosed" : ""}`}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					onClick={() => setParams(tab)}>
					<img
						src={`img/${tab}.png`}
						alt={tab}
						className="tab-icon"
					/>
					<p
						className="tab-name"
						style={tabStatus ? { color: "black" } : null}>
						{tab}
					</p>
					{hovered && (
						<img
							src="img/delete.png"
							alt="delete button"
							className="delete"
							onClick={(e) => {
								e.stopPropagation();
								deleteTab(tab);
							}}
						/>
					)}
					{tabStatus && <div className="border"></div>}
				</div>
			)}
		</Draggable>
	);
});
