import axios from "axios";
import StarIconEmpty from "../assets/icons/StarIconEmpty.jsx";
import DeleteIcon from "../assets/icons/deleteIcon.jsx";
import IconUpload from "../assets/icons/imageUploadIcon.jsx";
import StarIconFilled from "../assets/icons/starIconFilled.jsx";

export default function PhotoUploader({ pictures, onChange }) {
    const btnEffect = "hover:scale-110 duration-200";

    function uploadPicture(e) {
        e.preventDefault();
        const files = e.target.files;
        console.log({ files }); // <-- to check file
        for (let i = 0; i < files.length; i++) {
            console.log(files[i].type.split("/")[0]);
            if (files[i].type.split("/")[0] !== "image") {
                alert("File not compatible");
            } else {
                const data = new FormData();

                data.append("pictures", files[i]);

                axios
                    .post('http://localhost:8000/api/datingapp/profiles/uploadPhoto', data, {
                        headers: { "Content-type": "multipart/form-data" },
                    })
                    .then((response) => {
                        // console.log(response);
                        const { data: filenames } = response;
                        onChange((prev) => {
                            return [...prev, ...filenames];
                        });
                    });
            }
        }}

        function removePicture(e, filename) {
            e.preventDefault();
            onChange([...pictures.filter((eachPhoto) => eachPhoto !== filename)]);
        }
    
        function setMainPicture(e, filename) {
            e.preventDefault();
    
            onChange([
                filename,
                ...pictures.filter((eachPhoto) => eachPhoto !== filename),
            ]);
        }

        return(
            <div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {pictures.length > 0 &&
                    pictures.map((link) => (
                        <div key={link} className="h-32 flex relative">
                            <img
                                className="rounded-2xl w-full object-cover"
                                src={`http://localhost:8000/uploads/${link}`}
                                alt=""
                            />
                            <button
                                onClick={(e) => removePhoto(e, link)}
                                className="cursor-pointer absolute bottom-2 right-2 text-slate-300 text-lg font-bold bg-slate-300 bg-opacity-20 rounded">
                                <DeleteIcon
                                    className={`text-slate-200/50 hover:text-slate-200 ${btnEffect}`}
                                />
                            </button>
                            <button
                                onClick={(e) => setMainPhoto(e, link)}
                                className="cursor-pointer absolute top-2 right-2 text-slate-300 text-lg font-bold bg-slate-300 bg-opacity-20 rounded">
                                {link === pictures[0] ? (
                                    <StarIconFilled
                                        className={`text-slate-200/50 hover:text-slate-200 ${btnEffect}`}
                                    />
                                ) : (
                                    <StarIconEmpty
                                        className={`text-slate-200/50 hover:text-slate-200 ${btnEffect}`}
                                    />
                                )}
                            </button>
                        </div>
                    ))}
                    <label className="h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-2 text-slate-400 text-xl gap-1 hover:bg-secondary/10 duration-200">
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={uploadPicture}
                        />
                        <IconUpload className={`w-8 h-8 ${btnEffect}`} /> Upload
                    </label>
                </div>
            </div>

        )

}