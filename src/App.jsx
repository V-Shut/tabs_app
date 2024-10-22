import { useEffect, useState } from "react";
import "./App.css";
import { Tab } from "./components/tab";
import { useNavigate } from "react-router-dom";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

function App() {
	const initialTabs = JSON.parse(localStorage.getItem("tabs")) || [];
	const tabsList = [
		"Dashboard",
		"Banking",
		"Telefonie",
		"Accounting",
		"Verkauf",
		"Statistik",
		"Post Office",
		"Administration",
		"Help",
		"Warenbestand",
		"Auswahllisten",
		"Einkauf",
		"Rechn",
	].filter((tab) => !initialTabs.includes(tab));

	const [addTabStatus, setAddTabStatus] = useState(false);
	const [currentTabs, setCurrentTabs] = useState(initialTabs);
	const navigate = useNavigate();
	const params = new URLSearchParams(window.location.search);

	const createTab = (element) => {
		const newTabs = [...currentTabs, element];
		setCurrentTabs(newTabs);
		localStorage.setItem("tabs", JSON.stringify(newTabs));
		setAddTabStatus((prev) => !prev);
	};

	const deleteTab = (element) => {
		const newTabs = currentTabs.filter((tab) => tab !== element);
		localStorage.setItem("tabs", JSON.stringify(newTabs));
		setCurrentTabs(newTabs);

		const currentTab = params.get("tab");
		if (currentTab === element.toLowerCase().trim().replace(/\s+/g, "")) {
			if (newTabs.length > 0) {
				const nextTab = newTabs[0];
				navigate(`?tab=${nextTab.toLowerCase().trim().replace(/\s+/g, "")}`);
			} else {
				navigate(`?tab=`);
			}
		}
	};

	const setParams = (param) => {
		const createdParam = param.toLowerCase().trim().replace(/\s+/g, "");
		navigate(`?tab=${createdParam}`);
	};

	const handleOnDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const reorderedTabs = Array.from(currentTabs);
		const [removed] = reorderedTabs.splice(result.source.index, 1);
		reorderedTabs.splice(result.destination.index, 0, removed);

		setCurrentTabs(reorderedTabs);
		localStorage.setItem("tabs", JSON.stringify(reorderedTabs));
	};

	useEffect(() => {
		if (!currentTabs.length) {
			navigate(`?tab=`);
		}
	}, [currentTabs, navigate]);

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<div className="App">
				<div className="top-head" />
				<div className="tabs">
					<img
						src="img/pinned.png"
						alt="pinned"
						className="pinned"
					/>
					<Droppable droppableId="tabs" direction="horizontal">
						{(provided) => (
							<div
								className="tabs-container"
								{...provided.droppableProps}
								ref={provided.innerRef}>
								{currentTabs.map((tab, index) => (
									<Tab
										tab={tab}
										deleteTab={deleteTab}
										setParams={setParams}
										index={index}
										key={tab + index}
									/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
					<img
						src="img/arrow-up.png"
						alt="additionally"
						className={`add-tabs ${addTabStatus ? "active" : ""}`}
						onClick={() => setAddTabStatus((prev) => !prev)}
					/>
					{addTabStatus && (
						<ul className="add-list">
							{tabsList.map((tab) => (
								<li
									className="item"
									key={tab}
									onClick={() => {
										createTab(tab);
										setParams(tab);
									}}>
									<img
										src={`img/${tab}.png`}
										alt=""
										className="item-icon"
									/>
									<p>{tab}</p>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="field" />
			</div>
		</DragDropContext>
	);
}

export default App;
