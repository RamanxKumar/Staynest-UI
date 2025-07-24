import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

const EditRoom = () => {
	const [room, setRoom] = useState({
		photo: "",
		roomType: "",
		roomPrice: ""
	});

	const [imagePreview, setImagePreview] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const { roomId } = useParams();

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0];
		setRoom({ ...room, photo: selectedImage });
		setImagePreview(URL.createObjectURL(selectedImage));
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setRoom({ ...room, [name]: value });
	};

	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId);
				setRoom(roomData);
				setImagePreview(`data:image/jpeg;base64,${roomData.photo}`);
			} catch (error) {
				console.error(error);
			}
		};
		fetchRoom();
	}, [roomId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await updateRoom(roomId, room);
			if (response.status === 200) {
				setSuccessMessage("Room updated successfully!");
				const updatedRoomData = await getRoomById(roomId);
				setRoom(updatedRoomData);
				setImagePreview(`data:image/jpeg;base64,${updatedRoomData.photo}`);
				setErrorMessage("");
			} else {
				setErrorMessage("Error updating room");
			}
		} catch (error) {
			console.error(error);
			setErrorMessage(error.message);
		}
	};

	return (
		<div className="container my-5">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					<div className="card shadow-lg p-4 rounded bg-white">
						<h3 className="text-center text-primary mb-4">Edit Room</h3>

						{successMessage && <div className="alert alert-success">{successMessage}</div>}
						{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="roomType" className="form-label fw-semibold">
									Room Type
								</label>
								<input
									type="text"
									className="form-control"
									id="roomType"
									name="roomType"
									value={room.roomType}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="roomPrice" className="form-label fw-semibold">
									Room Price (₹)
								</label>
								<input
									type="number"
									className="form-control"
									id="roomPrice"
									name="roomPrice"
									value={room.roomPrice}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="photo" className="form-label fw-semibold">
									Room Photo
								</label>
								<input
									type="file"
									className="form-control"
									id="photo"
									name="photo"
									onChange={handleImageChange}
									accept="image/*"
								/>
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Room Preview"
										className="img-fluid mt-3 border rounded shadow-sm"
										style={{ maxHeight: "300px", objectFit: "cover" }}
									/>
								)}
							</div>

							<div className="d-flex justify-content-between mt-4">
								<Link to="/existing-rooms" className="btn btn-outline-secondary px-4">
									← Back
								</Link>
								<button type="submit" className="btn btn-warning px-4">
									Update Room
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditRoom;
