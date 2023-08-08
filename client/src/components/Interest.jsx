import React from "react";

function Interest({ selected, onChange }) {
    function checkBoxHandler(e) {
        const { checked, name } = e.target;
        if (checked) {
            onChange([...selected, name]);
            console.log(name);
        } else {
            onChange([
                ...selected.filter((selectedName) => selectedName !== name),
            ]);
        }
    }
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-6">
                <div className="flex items-center gap-2">
                    <input
                        onChange={checkBoxHandler}
                        checked={selected.includes("sport")}
                        name="sport"
                        type="checkbox"
                        value="sport"
                    />
                    <label className="text-dText/50 font-semibold text-sm">
                        sport
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        onChange={checkBoxHandler}
                        checked={selected.includes("reading")}
                        name="reading"
                        type="checkbox"
                        value="reading"
                    />
                    <label className="text-dText/50 font-semibold text-sm">
                        reading
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        onChange={checkBoxHandler}
                        checked={selected.includes("hiking")}
                        name="hiking"
                        type="checkbox"
                        value="hiking"
                    />
                    <label className="text-dText/50 font-semibold text-sm">
                        hiking
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        onChange={checkBoxHandler}
                        checked={selected.includes("coding")}
                        name="coding"
                        type="checkbox"
                        value="coding"
                    />
                    <label className="text-dText/50 font-semibold text-sm">
                        coding
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        onChange={checkBoxHandler}
                        checked={selected.includes("miniGolf")}
                        name="miniGolf"
                        type="checkbox"
                        value="miniGolf"
                    />
                    <label className="text-dText/50 font-semibold text-sm">
                        mini golf
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        onChange={checkBoxHandler}
                        checked={selected.includes("etc")}
                        name="etc"
                        type="checkbox"
                        value="etc"
                    />
                    <label className="text-dText/50 font-semibold text-sm">
                        etc
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Interest;