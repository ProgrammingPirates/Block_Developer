import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../utils/AuthProvider";
import { Link } from "react-router-dom";

import ConnectBtn from "../components/ConnectBtn";
import Button from "../components/Button";
import HeadingUnderline from "../components/HeadingUnderline";
import MovieCard from "../components/MovieCard";
import AddMovieModal from "../components/AddMovieModal";
import RegisterTheaterModal from "../components/RegisterTheaterModal";

import { fetchMoviesStorage } from "../utils/tzkt";
import searchResults from "../data";

export default function Admin() {
	// const [searchResults, setSearchResults] = useState([]);
	const { address } = useContext(AuthContext);

	const [data, setData] = useState(searchResults);

	const [openAddMovieModal, setOpenAddMovieModal] = useState(false);
	const [openRegisterTheaterModal, setOpenRegisterTheaterModal] =
		useState(false);

	// useEffect(() => {
	// 	fetchData();
	// }, []);

	// const fetchData = async () => {
	// 	try {
	// 		const storage = await fetchMoviesStorage();

	// 		const cityIds = storage.cityIds;

	// 		const movieDetails = storage.movieDetails;

	// 		const theatreDetails = storage.theatreDetails;

	// 		const cityDetails = storage.cityDetails;

	// 		const Data = [];
	// 		const data1 = [];
	// 		const data2 = [];

	// 		for (let i = 0; i < cityIds; i++) {
	// 			const name = cityDetails[i].name;

	// 			const theatreIds = storage.cityDetails[i].theatreIds;

	// 			for (let i = 0; i < theatreIds; i++) {
	// 				const theatreName = theatreDetails[i].name;
	// 				const address = theatreDetails[i].address;
	// 				const movieIds = theatreDetails[i].movieIds;

	// 				for (let i = 0; i < movieIds; i++) {
	// 					const movieName = movieDetails[i].name;
	// 					const description = movieDetails[i].description;
	// 					const posterLink = movieDetails[i].posterLink;
	// 					const screenNumber = movieDetails[i].screenNumber;
	// 					const ticketPrice = movieDetails[i].ticketPrice;
	// 					const startingDate = movieDetails[i].startingDate;
	// 					const timeSlot = movieDetails[i].timeSlot;

	// 					const fetchedObject = {
	// 						movieName: movieName,
	// 						description: description,
	// 						posterLink: posterLink,
	// 						screenNumber: screenNumber,
	// 						ticketPrice: ticketPrice,
	// 						startingDate: startingDate,
	// 						timeSlot: timeSlot,
	// 					};

	// 					data2.push(fetchedObject);
	// 				}

	// 				const fetchedObject = {
	// 					theatreName: theatreName,
	// 					address: address,
	// 					activeMovies: data2,
	// 				};

	// 				data1.push(fetchedObject);
	// 			}

	// 			const fetchedObject = {
	// 				cityName: name,
	// 				theatreDetails: data1,
	// 			};

	// 			Data.push(fetchedObject);
	// 			setSearchResults(Data);
	// 			searchResults = Data;
	// 		}
	// 	} catch (e) {
	// 		throw e;
	// 	}
	// };

	return (
		<div className="flex flex-col flex-1 px-28">
			{address ? (
				data ? (
					<div className="flex flex-col gap-[70px]">
						<div className="flex gap-10 items-center">
							<h2 className="text-4xl font-medium">
								Hey (
								{data[0].name.length >= 20
									? data[0].cityName.slice(0, 20) + "..."
									: data[0].cityName}
								) 👋
							</h2>
							<div className="flex gap-3 items-center">
								<div
									className="flex gap-3 px-4 h-[45px] justify-between items-center bg-blackToTrans border-primary rounded-20 hover:bg-white/5 transition cursor-pointer"
									onClick={() => setOpenAddMovieModal(true)}
								>
									<p className="text-4xl text-center">+</p>
									<p className="text-sm text-center font-semibold">
										List a Movie
									</p>
								</div>
							</div>
						</div>

						<div>
							<HeadingUnderline>Upcoming shows</HeadingUnderline>

							<div className="flex mt-30 pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
								{data[0].activeMovies.map((item) => {
									return <MovieCard data={item} />;
								})}
							</div>
						</div>
						<div>
							<HeadingUnderline>Past shows</HeadingUnderline>

							<div className="flex mt-30 pb-4 gap-7 max-w-full overflow-x-auto scroll-hor">
								{data[0].activeMovies.map((item) => {
									return (
										<MovieCard
											data={item}
											withoutBtn={true}
											withTotalPrice={true}
										/>
									);
								})}
							</div>
						</div>
					</div>
				) : (
					<div className="flex-1 flex flex-col justify-center items-center gap-14">
						<div className="flex flex-col justify-center items-center gap-3">
							<h2 className="text-5xl font-semibold">No Theater found!</h2>
							<p className="text-lg text-center">
								If you're looking to book tickets, navigate to{" "}
								<Link className="underline" to="/search">
									search page
								</Link>
								.
							</p>
						</div>
						<Button
							weight={"700"}
							onClick={() => setOpenRegisterTheaterModal(true)}
						>
							Register your Theatre →
						</Button>
					</div>
				)
			) : (
				<div className="flex-1 flex flex-col justify-center items-center gap-14">
					<div className="flex flex-col justify-center items-center gap-3">
						<h2 className="text-5xl font-semibold">Oops!</h2>
						<p className="text-lg font-medium text-center">
							Looks like you're not connected to your wallet!
						</p>
					</div>
					<ConnectBtn />
				</div>
			)}

			{openAddMovieModal && (
				<AddMovieModal
					data={openAddMovieModal}
					setOpenMovieModal={setOpenAddMovieModal}
				/>
			)}
			{openRegisterTheaterModal && (
				<RegisterTheaterModal
					data={openRegisterTheaterModal}
					setOpenRegisterTheaterModal={setOpenRegisterTheaterModal}
				/>
			)}
		</div>
	);
}
