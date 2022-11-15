import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../../providers/global";
import styles from "./AddEventForm.module.css";

const AddEventForm = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [category, setCategory] = useState("");
	const { position, user } = useContext(AuthContext);

	//   interface addForm {
	//     name: string;
	//     setName: (name: string) => void;
	//     description: string;
	//     setDescription: (name: string) => void;
	//   }

	const addEvent = async (e: any): Promise<void> => {
		e.preventDefault();
		await addDoc(collection(db, "events"), {
			name: name,
			description: description,
			position: position,
			email: user,
			date: date,
			time: time,
			category: category,
		});
		setName("");
		setDescription("");
		setTime("");
		setDate("");
		setCategory("");
	};

	return (
		<div className={styles.FormWrapper}>
			{/* <input placeholder="latitude"></input>
        <input placeholder="longtitude"></input> */}
			<form
				onSubmit={addEvent}
				className={styles.form}
			>
				<input
					placeholder="imię"
					onChange={(e) => {
						setName(e.target.value);
					}}
					value={name}
					required
				/>

				<select
					name="category"
					id="category-select"
					onChange={(e) => {
						setCategory(e.target.value);
					}}
					value={category}
				>
					<option value="">Wybierz kategorię</option>
					<option value="sport">Sport</option>
					<option value="nauka">Nauka</option>
					<option value="kultura">Kultura</option>
				</select>
				<input
					placeholder="data"
					onChange={(e) => {
						setDate(e.target.value);
					}}
					value={date}
					type="date"
					required
				/>
				<input
					placeholder="godzina"
					onChange={(e) => {
						setTime(e.target.value);
					}}
					value={time}
					type="time"
					required
				/>
				<textarea
					placeholder="opis"
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					value={description}
					required
				/>
				<button>Add Event</button>
			</form>
		</div>
	);
};

export default AddEventForm;
