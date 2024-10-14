import { useState } from "react";
import "./App.css";
import { Tab } from "./components/tab";

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

	const createTab = (element) => {
		const newTabs = [...currentTabs, element];
		setCurrentTabs(newTabs);
		localStorage.setItem("tabs", JSON.stringify(newTabs));
		setAddTabStatus((prev) => !prev);
  };
  
  const deleteTab = (element) => {
    const newTabs = [...currentTabs].filter(tab => tab !== element);
    localStorage.setItem("tabs", JSON.stringify(newTabs));
    setCurrentTabs(newTabs);
  }

	return (
		<div className="App">
			<div className="top-head" />
			<div className="tabs">
				<img
					src="img/pinned.png"
					alt="pinned"
					className="pinned"
				/>
				<div className="tabs-container">
					{currentTabs.map((tab) => (
						<Tab
							tab={tab}
              deleteTab={deleteTab}
              key={tab}
						/>
					))}
				</div>
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
								onClick={() => createTab(tab)}>
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
	);
}

export default App;
