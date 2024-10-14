import { useNavigate } from "react-router-dom";
import "./App.css";
import { Tab } from "./components/tab";

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
];

function App() {

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
					{tabsList.map((tab) => (
						<Tab
              tab={tab}
              key={tab}
						/>
					))}
				</div>
				<img
					src="img/arrow-up.png"
					alt="additionally"
					className="additionally"
				/>
			</div>
			<div className="field"></div>
		</div>
	);
}

export default App;
