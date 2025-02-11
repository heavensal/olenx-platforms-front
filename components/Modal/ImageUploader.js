"use client";
import userStore from "@/stores/userStore";
import { useState } from "react";

const ImageUploader = ({ onUpload }) => {
    const { avatar, updateAvatar } = userStore();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Veuillez sélectionner un fichier.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("upload_preset", "olenxplatforms");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dmbigyamv/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log(data.secure_url);

                setUploadedImageUrl(data.secure_url);
                onUpload(data.secure_url);
                updateAvatar(data.secure_url); // Envoie l'URL à `ProfileForm`
            } else {
                console.error("Erreur:", data.error);
            }
        } catch (error) {
            console.error("Erreur lors de l'upload :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {console.log(avatar)}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button
                onClick={handleUpload}
                disabled={loading}
                style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                }}
            >
                {loading ? "Uploading..." : "Uploader"}
            </button>

            {uploadedImageUrl && (
                <div>
                    <img src={uploadedImageUrl} alt="Uploaded" width="100" />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
