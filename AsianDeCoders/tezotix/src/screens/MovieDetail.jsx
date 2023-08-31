import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../utils/AuthProvider";

import poster from "../assets/oppenheimer.png";
import locationPin from "../assets/locationPin.svg";
import ticketIcon from "../assets/ticketIcon.svg";
import screenGradient from "../assets/screenGradient.svg";

import HeadingUnderline from "../components/HeadingUnderline";
import TicketCanvas from "../components/TicketCanvas";
import Button from "../components/Button";

import { tezos } from "../utils/tezos";

// import addresses from "../config/config";
// import { char2Bytes } from "@taquito/tzip16";
// import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

export default function MovieDetail() {
	const { id } = useParams();

	const { address, connected, connectWallet, disconnectWallet } =
		useContext(AuthContext);

	const [selectedDate, setSelectedDate] = useState(0);
	const [selectedShow, setSelectedShow] = useState(0);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [total, setTotal] = useState(0);
	const [ticketUrl, setTicketUrl] = useState(null);

	const [movieDetails, setMovieDetails] = useState({
		id: 2,
		poster: poster,
		name: "Oppenheimer",
		description:
			"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
		location: "INOX: Odeon, Connaught Place",
		screenNo: "5",
		price: 0.6,
		dates: [
			{
				date: "26 Aug 2023",
				shows: [
					{
						time: "10:00",
						booked: ["A1", "A2", "A3"],
					},
					{
						time: "15:00",
						booked: ["A1", "A2", "D3"],
					},
					{
						time: "19:00",
						booked: ["A1", "B2", "A3"],
					},
					{
						time: "23:00",
						booked: ["A1", "A2", "A3"],
					},
				],
			},
			{
				date: "27 Aug 2023",
				shows: [
					{
						time: "10:00",
						booked: ["A1", "A2", "A3"],
					},
					{
						time: "15:00",
						booked: ["A1", "A2", "A3"],
					},
					{
						time: "19:00",
						booked: ["A1", "A2", "A3"],
					},
					{
						time: "23:00",
						booked: ["A1", "A2", "A3"],
					},
				],
			},
			{
				date: "28 Aug 2023",
				shows: [
					{
						time: "10:00",
						booked: ["A1", "A2", "A3"],
					},
					{
						time: "15:00",
						booked: ["A1", "A2", "A3"],
					},
					{
						time: "19:00",
						booked: ["A1", "A2", "A3"],
					},
					{
						time: "23:00",
						booked: ["A1", "A2", "A3"],
					},
				],
			},
			{
				date: "29 Aug 2023",
				shows: [
					{
						time: "10:00",
						booked: ["A1", "A2", "A3"],
					},
					{
						time: "15:00",
						booked: ["A1", "A2", "A3"],
					},
					{
						time: "19:00",
						booked: ["A1", "A2", "A3"],
					},
					{
						time: "23:00",
						booked: ["A1", "A2", "A3"],
					},
				],
			},
		],
	});

	useEffect(() => {
		setTotal(Math.floor(movieDetails.price * selectedSeats.length * 100) / 100);
	}, [movieDetails, selectedSeats]);

	const onConnectWallet = async () => {
		await connectWallet();
		address && navigator.clipboard.writeText(address);
		address &&
			toast.success(
				`${
					address.slice(0, 5) + "..." + address.slice(-5)
				} connected successfully. Address copied to clipboard`,
				{
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				}
			);
	};

	const onDisconnectWallet = async () => {
		await disconnectWallet();

		toast.success(`Wallet disconnected!`, {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	};

	const handlePay = async () => {
		// try {
		// 	const contractInstance = await tezos.wallet.at(addresses.movies);
		// 	function getAccessToken() {
		// 		return process.env.REACT_APP_ACCESS_TOKEN;
		// 	}
		// 	function makeStorageClient() {
		// 		return new Web3Storage({ token: getAccessToken() });
		// 	}
		// 	async function makeFileObjects(questions) {
		// 		const files = [new File([questions], "nftInfo.json")];
		// 		return files;
		// 	}
		// 	async function storeFiles(questions) {
		// 		const files = await makeFileObjects(questions);
		// 		const client = makeStorageClient();
		// 		const cid = await client.put(files, { wrapWithDirectory: false });
		// 		return cid;
		// 	}
		// 	const metadata = JSON.stringify({
		// 		name: `sdfdsdf`,
		// 		rights: "All right reserved.",
		// 		symbol: "JOKO",
		// 		edition: `0`,
		// 		formats: "[...]", // 3 items
		// 		creators: "[...]", // 2 items
		// 		decimals: "0",
		// 		royalties: "{...}", // 2 items
		// 		attributes: "[...]", // 7 items
		// 		displayUri: `https://ipfs.io/ipfs/bafkreichoa44xeguarjljjoy3pobgc5dbjxpm5xc2ealolq7ky46tywz3i`,
		// 		artifactUri: `https://ipfs.io/ipfs/bafkreichoa44xeguarjljjoy3pobgc5dbjxpm5xc2ealolq7ky46tywz3i`,
		// 		description: `Description`,
		// 		thumbnailUri: `https://ipfs.io/ipfs/bafkreichoa44xeguarjljjoy3pobgc5dbjxpm5xc2ealolq7ky46tywz3i`,
		// 		isBooleanAmount: true,
		// 		shouldPreferSymbol: false,
		// 	});
		// 	const MetadataCID = await storeFiles(metadata);
		// 	const metadata_bytes = char2Bytes(`${MetadataCID}`);
		// 	const op = await contractInstance.methodsObject
		// 		.book_ticket({
		// 			_movieId: 0,
		// 			_seatNumber: 14,
		// 			_metadata: metadata_bytes,
		// 		})
		// 		.send();
		// 	await op.confirmation(1);
		// 	const FA2_contract = await tezos.wallet.at(addresses.FA2);
		// 	const op2 = await FA2_contract.methodsObject
		// 		.update_operators([
		// 			{
		// 				add_operator: {
		// 					owner: address,
		// 					operator: addresses.marketplace,
		// 					token_id: index,
		// 				},
		// 			},
		// 		])
		// 		.send();
		// 	await op2.confirmation(1);
		// 	toast.success(`Minting NFT was successful`, {
		// 		position: "top-center",
		// 		autoClose: 1000,
		// 		hideProgressBar: false,
		// 		closeOnClick: true,
		// 		pauseOnHover: true,
		// 		draggable: true,
		// 		progress: undefined,
		// 		theme: "dark",
		// 	});
		// } catch (err) {
		// 	setLoading(false);
		// 	toast.error(`An unknown error occured!`, {
		// 		position: "top-center",
		// 		autoClose: 1000,
		// 		hideProgressBar: false,
		// 		closeOnClick: true,
		// 		pauseOnHover: true,
		// 		draggable: true,
		// 		progress: undefined,
		// 		theme: "dark",
		// 	});
		// 	throw err;
		// }
	};

	return (
		<div className="flex flex-col flex-1">
			{connected ? (
				<>
					<div className="flex max-w-[1450px] mx-auto">
						<div className="flex-1 px-30 relative">
							<img
								src={movieDetails.poster}
								alt={movieDetails.name}
								className="w-full rounded-20 border-primary border-[2px]"
							/>
						</div>
						<div className="flex-1 px-30 flex flex-col justify-center gap-10">
							<div className="flex flex-col gap-8">
								<h1 className="text-4xl font-bold text-white">
									{movieDetails.name}
								</h1>
								<p className="text-base text-white/50">
									{movieDetails.description}
								</p>
							</div>
							<div className="flex flex-col gap-4">
								<div className="flex flex-row gap-2">
									<img src={locationPin} className="w-5" />
									<p className="text-xl font-medium text-white/75">
										{movieDetails.location}
									</p>
								</div>
								<div className="flex flex-row gap-2 items-center">
									<img src={ticketIcon} className="w-5" />
									<p className="text-xl font-medium text-white/75">
										{movieDetails.price} ꜩ
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-center flex-wrap gap-[100px] px-20 mt-50">
						<div className="w-[calc(50%-70px)] flex flex-col gap-14">
							<div className="flex items-center gap-4">
								<p className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-primary bg-blackToTrans text-xl font-medium">
									1
								</p>
								<HeadingUnderline>Select show date & time</HeadingUnderline>
							</div>
							<div className="flex flex-col gap-4">
								{movieDetails.dates.map((day, ind1) => {
									return (
										<div className="flex flex-row items-center gap-3">
											<p className="text-lg font-medium">{day.date}</p>
											{day.shows.map((show, ind2) => {
												return (
													<p
														className={`px-15 py-2 text-[14px] font-medium text-white75 rounded-10 border-primary bg-blackToTrans hover:bg-white/10 cursor-pointer ${
															selectedDate === ind1 &&
															selectedShow === ind2 &&
															"bg-white/20"
														}`}
														onClick={() => {
															setSelectedShow(ind2);
															setSelectedDate(ind1);
														}}
													>
														{show.time}
													</p>
												);
											})}
										</div>
									);
								})}
							</div>
						</div>

						<div className="w-[calc(50%-70px)] flex flex-col gap-14">
							<div className="flex items-center gap-4">
								<p className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-primary bg-blackToTrans text-xl font-medium">
									2
								</p>
								<HeadingUnderline>Select your seats</HeadingUnderline>
							</div>

							<div className="flex flex-col justify-center gap-5 w-full">
								<img src={screenGradient} alt="" />

								<div className="flex flex-col gap-[10px]">
									{Array(5)
										.fill()
										.map((_1, ind1) => {
											return (
												<div className="flex flex-row gap-[10px] justify-center">
													{Array(15)
														.fill()
														.map((_2, ind2) => {
															return (
																<div
																	aria-label={
																		String.fromCharCode(65 + ind1) + (ind2 + 1)
																	}
																	className={`bg-white/10 w-7 h-7 rounded-t-[8px] ${
																		movieDetails.dates[selectedDate].shows[
																			selectedShow
																		].booked.includes(
																			String.fromCharCode(65 + ind1) +
																				(ind2 + 1)
																		)
																			? "bg-yellow"
																			: " cursor-pointer"
																	} ${
																		selectedSeats.includes(
																			String.fromCharCode(65 + ind1) +
																				(ind2 + 1)
																		)
																			? "bg-green"
																			: ""
																	}`}
																	onClick={() => {
																		if (
																			!movieDetails.dates[selectedDate].shows[
																				selectedShow
																			].booked.includes(
																				String.fromCharCode(65 + ind1) +
																					(ind2 + 1)
																			)
																		) {
																			if (
																				selectedSeats.includes(
																					String.fromCharCode(65 + ind1) +
																						(ind2 + 1)
																				)
																			) {
																				setSelectedSeats(
																					selectedSeats.filter((_) => {
																						return (
																							_ !==
																							String.fromCharCode(65 + ind1) +
																								(ind2 + 1)
																						);
																					})
																				);
																			} else {
																				setSelectedSeats([
																					...selectedSeats,
																					String.fromCharCode(65 + ind1) +
																						(ind2 + 1),
																				]);
																			}
																		}
																	}}
																></div>
															);
														})}
												</div>
											);
										})}
								</div>

								<div className="flex gap-10 justify-center">
									<div className="flex items-center gap-2">
										<p className="w-4 h-4 rounded-full bg-yellow"></p>
										<p>Booked</p>
									</div>
									<div className="flex items-center gap-2">
										<p className="w-4 h-4 rounded-full bg-green"></p>
										<p>Selected</p>
									</div>
									<div className="flex items-center gap-2">
										<p className="w-4 h-4 rounded-full bg-white/10"></p>
										<p>Available</p>
									</div>
								</div>
							</div>
						</div>

						<div className="w-[calc(50%-70px)] flex flex-col gap-14">
							<div className="flex items-center gap-4">
								<p className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-primary bg-blackToTrans text-xl font-medium">
									3
								</p>
								<HeadingUnderline>Booking summary</HeadingUnderline>
							</div>

							<div className="flex justify-between items-center gap-[70px]">
								<TicketCanvas
									ticketDetails={{
										poster: movieDetails.poster,
										name: movieDetails.name,
										dateTime:
											movieDetails.dates[selectedDate].date +
											", " +
											movieDetails.dates[selectedDate].shows[selectedShow].time,
										theatre: movieDetails.location,
										screenNo: movieDetails.screenNo,
										seats: selectedSeats,
										price: movieDetails.price,
										barcodeData: address,
									}}
									setTicketUrl={setTicketUrl}
									height="350px"
								/>

								<div className="w-full h-max flex flex-col gap-5">
									<div className="flex justify-between">
										<p className="text-white/50 Poppins">Theatre name:</p>
										<p className="text-white Poppins font-medium">
											{movieDetails.location.length > 25
												? movieDetails.location.slice(0, 25) + "..."
												: movieDetails.location}
										</p>
									</div>
									<div className="flex justify-between">
										<p className="text-white/50 Poppins font-medium">
											Show Date:
										</p>
										<p className="text-white Poppins font-medium">
											{movieDetails.dates[selectedDate].date}
										</p>
									</div>
									<div className="flex justify-between">
										<p className="text-white/50 Poppins font-medium">
											Show timing:
										</p>
										<p className="text-white Poppins font-medium">
											{
												movieDetails.dates[selectedDate].shows[selectedShow]
													.time
											}
										</p>
									</div>
									<div className="flex justify-between">
										<p className="text-white/50 Poppins font-medium">
											Number of selected seats:
										</p>
										<p className="text-white Poppins font-medium">
											{selectedSeats.length}
										</p>
									</div>
									<div className="flex justify-between">
										<p className="text-white/50 Poppins font-medium">
											Price per seat:
										</p>
										<p className="text-white Poppins font-medium">
											{movieDetails.price} ꜩ
										</p>
									</div>
									<div className="flex justify-between">
										<p className="text-white/50 Poppins font-medium">
											Subtotal:
										</p>
										<p className="text-white Poppins font-medium">
											<span className="text-white/40 text-xs font-normal mr-1">
												{movieDetails.price} x {selectedSeats.length} =
											</span>
											{total} ꜩ
										</p>
									</div>

									<Button weight={"700"} onClick={handlePay}>
										Pay {total} ꜩ
									</Button>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="w-screen flex-1 flex flex-col justify-center items-center gap-14">
					<div className="flex flex-col justify-center items-center gap-3">
						<h2 className="text-5xl font-semibold">Oops!</h2>
						<p className="text-lg font-medium text-center">
							Looks like you're not connected to your wallet!
						</p>
					</div>
					<Button
						weight={"700"}
						onClick={address ? onDisconnectWallet : onConnectWallet}
					>
						{connected
							? address.slice(0, 5) + "..." + address.slice(-5)
							: "Connect wallet"}
					</Button>
				</div>
			)}
		</div>
	);
}
