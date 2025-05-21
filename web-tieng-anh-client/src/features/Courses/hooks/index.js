import { useEffect, useState } from "react";

export function useWordNoteOptions(wordNotes) {
	// const { wordNotes } = useSelector((state) => state.wordNote);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const temp = [];
		for (const wordNote of wordNotes) {
			temp.push({ label: wordNote.name, value: wordNote.id });
		}
		setOptions(temp);
	}, [wordNotes]);

	return options;
}
